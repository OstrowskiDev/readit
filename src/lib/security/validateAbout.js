export function validateAbout(formData) {
  const validationObject = { errors: '' }

  if (formData.about.length > 600) {
    validationObject.errors = 'Use no more than 600 characters.'
  }
  return validationObject
}
