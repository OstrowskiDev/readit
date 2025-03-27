import { passwordRegex } from './passwordRegex'
import { validateField } from './validationUtils'

export function validatePasswords(formData) {
  const { password, repeatPassword } = formData
  const validationObject = {
    password: { message: [] },
    repeatPassword: { message: [] },
  }
  // !!!! not sure about this deep copy, it looks like its not needed anymore:
  const validationResults = JSON.parse(JSON.stringify(validationObject))

  const formFields = ['password', 'repeatPassword']
  for (const field of formFields) {
    validateField(
      validationResults,
      field,
      () => typeof formData[field] !== 'string',
      'Invalid data.',
    )
  }

  if (typeof password !== 'string' || typeof repeatPassword !== 'string')
    return validationResults

  for (const field of formFields) {
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
