// export { default } from 'next-auth/middleware'

// !!!! dodaj nagłówek CSP do wszystkich odpowiedzi:
// const response = NextResponse.next();
// response.headers.set(
//   'Content-Security-Policy',
//   "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'"
// );
// return response

// muszę także zmienić config matcher
// export const config = { matcher: ['/posts/create/:path*'] }

import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { RateLimiterMemory } from 'rate-limiter-flexible'

// protection for REGISTER route (60 registration per hour? registration requires email confirmation so being strict here is not necessarly needed)

// 1. Global protection from DDOS at 1k / mintue
const limiterGlobalDDOS = new RateLimiterMemory({
  points: 5000,
  duration: 60,
})

// 2. protection from burst at 50 req/sec
const limiterBurstIP = new RateLimiterMemory({
  points: 50,
  duration: 1,
})

// 3. login route protection based on IP
// note: emails are already protected against brute force attacks
// five failed login attempts will result in account lockdown
// !!!! check if path is correct
const limiterLoginIP = new RateLimiterMemory({
  points: 5,
  duration: 60 * 1,
})

// 4. GET requests for images 200/hour
// Cloudflare free limit is 100k/month
// this gives on average 139/hour
const limiterImages = new RateLimiterMemory({
  points: 139,
  duration: 60 * 60,
})

// 5. Limit PUT, POST, DELETE req per User
const limiterPerUser = new RateLimiterMemory({
  points: 600,
  duration: 60 * 60,
})

export async function middleware(request) {
  const { pathname } = request.nextUrl
  const method = request.method
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0] : request.ip || undefined

  // 1. Global protection from DDOS at 1k / mintue
  try {
    const res = await limiterGlobalDDOS.consume('global')
    console.log(`[Global_Anon] Remaining: ${res.remainingPoints}`)
  } catch {
    return new NextResponse('Too many requests', {
      status: 429,
    })
  }

  // 2. protection from burst at 50 req/sec
  if (ip) {
    try {
      const res = await limiterBurstIP.consume(ip)
      console.log(`[Burst_Global] ${ip} - Remaining: ${res.remainingPoints}`)
    } catch {
      return new NextResponse('Too many requests in short time', {
        status: 429,
      })
    }
  }

  // 3. login route protection based on IP
  if (ip) {
    if (pathname.startsWith('/api/auth/login') && method === 'POST') {
      try {
        const res = await limiterLoginIP.consume(ip)
        console.log(`[LoginIP] ${ip} - Remaining: ${res.remainingPoints}`)
      } catch {
        return new NextResponse('Too many login attempts', { status: 429 })
      }
    }
  }

  // 4. GET requests for images 500/hour
  if (pathname.startsWith('/api/images') && method === 'GET') {
    try {
      const res = await limiterImages.consume(ip)
      console.log(`[ImageGET] ${ip} - Remaining: ${res.remainingPoints}`)
    } catch {
      return new NextResponse('Too many image requests', { status: 429 })
    }
  }

  // 5. Limit PUT, POST, DELETE req per User
  if (method === 'PUT' || method === 'POST' || method === 'DELETE') {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    })

    if (token?.email) {
      const email = token.email
      try {
        const res = await limiterPerUser.consume(email)
        console.log(`[User] ${email} - Remaining: ${res.remainingPoints}`)
      } catch {
        return new NextResponse('Too many actions from this user', {
          status: 429,
        })
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/:path*'],
}
