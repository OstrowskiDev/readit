import validator from 'validator'

export function validateSignIn({ email, password }) {
  if (typeof email !== 'string' || typeof password !== 'string') return false
  if (!email || !password) return false

  email = email.trim()
  if (!validator.isEmail(email)) return false

  return true
}
