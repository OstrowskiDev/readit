import validator from 'validator'

function validatePostTitle(inputTitle) {
  inputTitle = validateString(inputTitle)
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

function validatePostContent(inputContent) {
  return validateString(inputContent)
}

function validateString(input) {
  const isString = typeof input === 'string'
  return isString ? input : input.toString()
}

export { validatePostTitle, validatePostContent }
