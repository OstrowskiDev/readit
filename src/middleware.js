export { default } from 'next-auth/middleware'

export const config = { matcher: ['/posts/post/:path*', '/posts/create/:path*'] }
