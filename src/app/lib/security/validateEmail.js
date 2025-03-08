import validator from 'validator'

export function validateEmail(email) {
  const isEmailValid = validator.isEmail(email)
  if (!isEmailValid) {
    return { message: 'Please enter valid email address.' }
  } else {
    return { message: '' }
  }
}
