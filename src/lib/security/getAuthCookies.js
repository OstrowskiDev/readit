export function getAuthCookies(cookies) {
  let sessionToken
  let csrfToken
  let callbackUrl

  const nodeEnv = process.env.NODE_ENV

  if (nodeEnv === 'production') {
    sessionToken = cookies.get('__Secure-next-auth.session-token')
    csrfToken = cookies.get('__Host-next-auth.csrf-token')
    callbackUrl = cookies.get('__Secure-next-auth.callback-url')
  } else {
    sessionToken = cookies.get('next-auth.session-token')
    csrfToken = cookies.get('next-auth.csrf-token')
    callbackUrl = cookies.get('next-auth.callback-url')
  }

  if (!sessionToken || !csrfToken || !callbackUrl) {
    throw new Error('Missing required auth cookies')
  }

  const cookieHeader =
    nodeEnv === 'production'
      ? [
          `__Secure-next-auth.session-token=${sessionToken.value}`,
          `__Host-next-auth.csrf-token=${csrfToken.value}`,
          `__Secure-next-auth.callback-url=${callbackUrl.value}`,
        ].join('; ')
      : [
          `next-auth.session-token=${sessionToken.value}`,
          `next-auth.csrf-token=${csrfToken.value}`,
          `next-auth.callback-url=${callbackUrl.value}`,
        ].join('; ')

  return cookieHeader
}
