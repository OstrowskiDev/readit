import validator from 'validator'

function validatePostTitle(inputTitle) {
  if (validator.isAlphanumeric(inputTitle)) {
    const validTitle = inputTitle
    return validTitle
  } else {
    //remove non-alphanumeric characters, excluding space
    //space that comes after 0-9 is important because it includes it into allowed characters
    const sanitizedTitle = inputTitle.replace(/[^a-zA-Z0-9 ]/g, '')
    return sanitizedTitle
  }
}

function validateContent(inputContent) {
  const isString = typeof inputContent === 'string'
  return isString ? inputContent : toString()
}

export { validatePostTitle, validateContent }
