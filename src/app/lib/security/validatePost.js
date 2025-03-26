import validator from 'validator'

function validatePostTitle(title) {
  if (!isString(title)) {
    return { error: 'Invalid Post title data' }
  }

  if (!title) {
    return { error: 'Post title is required' }
  }

  if (containsOnlySpaces(title)) {
    return { error: 'Post title is required' }
  }

  if (validator.isAlphanumeric(title)) {
    return { sanitizedString: title, error: null }
  }
  //Title sanitization: remove non-alphanumeric characters, excluding space
  //in below regex space that comes after 0-9 is required to whitelits it
  const sanitizedTitle = title.replace(/[^a-zA-Z0-9 ]/g, '')
  return { sanitizedString: sanitizedTitle, error: null }
}

function validatePostContent(content) {
  if (!isString(content)) {
    return { error: 'Invalid Post content data' }
  }

  if (!content) {
    return { error: 'Post content is required' }
  }

  if (containsOnlySpaces(content)) {
    return { error: 'Post content is required' }
  }

  return { sanitizedString: content, error: null }
}

function isString(input) {
  return typeof input === 'string'
}

function containsOnlySpaces(input) {
  return input.trim() === ''
}

export { validatePostTitle, validatePostContent }
