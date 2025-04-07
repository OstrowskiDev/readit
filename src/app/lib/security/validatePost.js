import validator from 'validator'
import { validateField } from './validationUtils'

export function validatePost(formData) {
  const validationResults = {
    title: { message: [], sanitized: '' },
    content: { message: [], sanitized: '' },
  }

  const fieldRequired = ['title', 'content']

  for (const field of fieldRequired) {
    validateField(
      validationResults,
      field,
      () => !isString(formData[field]),
      `Invalid post ${field} data`,
    )
  }

  for (const field of fieldRequired) {
    validateField(
      validationResults,
      field,
      () => !formData[field],
      `Post ${field} is required.`,
    )
  }

  for (const field of fieldRequired) {
    validateField(
      validationResults,
      field,
      () => containsOnlySpaces(formData[field]),
      `Post ${field} is required.`,
    )
  }

  if (validator.isAlphanumeric(formData.title)) {
    validationResults.title.sanitized = formData.title
  } else {
    //Title sanitization: remove non-alphanumeric characters, excluding space
    //in below regex space that comes after 0-9 is required to whitelist it
    const sanitizedTitle = formData.title.replace(/[^a-zA-Z0-9 ]/g, '')
    validationResults.title.sanitized = sanitizedTitle
  }

  const sanitizedContent = formData.content.trim()
  validationResults.content.sanitized = sanitizedContent

  return validationResults
}

function isString(input) {
  return typeof input === 'string'
}

function containsOnlySpaces(input) {
  return input.trim() === ''
}
