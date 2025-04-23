export { default } from 'next-auth/middleware'

// !!!! dodaj nagłówek CSP do wszystkich odpowiedzi:
// const response = NextResponse.next();
// response.headers.set(
//   'Content-Security-Policy',
//   "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'"
// );
// return response

// muszę także zmienić config matcher
export const config = { matcher: ['/posts/create/:path*'] }
