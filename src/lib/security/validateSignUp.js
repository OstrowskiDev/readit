import validator from 'validator'
import { passwordRegex } from './passwordRegex'
import { validateField } from './validationUtils'

export function validateSignUp(formData) {
  const { fullName, name, email, password, privacyPolicy } = formData

  const validationResults = {
    name: { message: [] },
    email: { message: [] },
    password: { message: [] },
    privacyPolicy: { message: [] },
    fullName: { message: [] }, //honeypot field
  }

  const fieldRequired = ['name', 'email', 'password', 'privacyPolicy']
  for (const field of fieldRequired) {
    validateField(
      validationResults,
      field,
      () => !formData[field],
      'This field is required.',
    )
  }

  validateField(
    validationResults,
    'name',
    () => !validator.matches(name, /^[a-zA-Z\s]*$/),
    'Name cannot contain numbers or special characters.',
  )

  const forbiddenWords = ['admin', 'moderator', 'root']
  validateField(
    validationResults,
    'name',
    () => forbiddenWords.some((word) => name.toLowerCase().includes(word)),
    "Words 'admin', 'moderator' and 'root' are not allowed.",
  )

  validateField(
    validationResults,
    'name',
    () => !validator.isLength(name, { max: 16 }),
    'Name cannot be longer than 16 characters.',
  )

  validateField(
    validationResults,
    'name',
    () => !(name.trim() === name),
    'Name cannot have spaces at the beginning or end.',
  )

  validateField(
    validationResults,
    'email',
    () => !validator.isEmail(email),
    'Please enter valid email address.',
  )

  validateField(
    validationResults,
    'password',
    () => !passwordRegex.test(password),
    'Password must be at least 8 characters, with an uppercase letter, lowercase letter, number, and special character.',
  )

  validateField(
    validationResults,
    'fullName',
    () => fullName !== '',
    'bot detected',
  )

  return validationResults
}
