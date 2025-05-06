import { validateField } from './validationUtils'

export function validateAccountDelOnClient(formData) {
  const { password, confirmation } = formData
  const validationResults = {
    password: { message: [] },
    confirmation: { message: [] },
  }

  const formFields = ['password', 'confirmation']
  for (const field of formFields) {
    validateField(
      validationResults,
      field,
      () => typeof formData[field] !== 'string',
      'Invalid data.',
    )
  }

  if (typeof password !== 'string' || typeof confirmation !== 'string')
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
    'confirmation',
    () => confirmation !== 'DELETE',
    'Type DELETE to confirm account deletion.',
  )

  return validationResults
}
