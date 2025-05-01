import validator from 'validator'
import { validateField } from './validationUtils'
//!!!! add post title and content validation, make it same as that one in mongoose schema
export const validationObject = {
  title: { message: [] },
  content: { message: [] },
}

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

  validateField(
    validationResults,
    'title',
    () => formData.title.length > 40,
    'Title is too long',
  )

  validateField(
    validationResults,
    'content',
    () => formData.content.length < 40,
    'Post needs to have at least 20 characters.',
  )

  validateField(
    validationResults,
    'content',
    () => formData.content.length > 10000,
    'Your post is too long. Who will read more than 10ooo characters?',
  )

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
