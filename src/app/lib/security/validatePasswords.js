import { passwordRegex } from './passwordRegex'
import { validateField } from './validationUtils'

export function validatePasswords(formData) {
  const { password, repeatPassword } = formData
  const validationObject = {
    password: { message: [] },
    repeatPassword: { message: [] },
  }

  const validationResults = JSON.parse(JSON.stringify(validationObject))

  const fieldRequired = ['password', 'repeatPassword']
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
    'password',
    () => !passwordRegex.test(password),
    'Password must be at least 8 characters, with an uppercase letter, lowercase letter, number, and special character.',
  )

  validateField(
    validationResults,
    'repeatPassword',
    () => password !== repeatPassword,
    'Passwords do not match',
  )

  return validationResults
}
