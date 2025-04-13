export function getAuthCookies(cookies) {
  const sessionToken = cookies.get('next-auth.session-token')
  const csrfToken = cookies.get('next-auth.csrf-token')
  const callbackUrl = cookies.get('next-auth.callback-url')

  const cookieHeader = [
    `next-auth.session-token=${sessionToken.value}`,
    `next-auth.csrf-token=${csrfToken.value}`,
    `next-auth.callback-url=${callbackUrl.value}`,
  ].join('; ')

  return cookieHeader
}
