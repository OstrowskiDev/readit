export { default } from 'next-auth/middleware'

// applies next-auth only to matching routes, can use regex, more info at:
// https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = { matcher: ['/posts/post/:path*', '/posts/create/:path*'] }
