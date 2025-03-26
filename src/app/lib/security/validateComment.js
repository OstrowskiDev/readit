function validateCommentContent(content) {
  if (!(typeof input === 'string')) {
    return { error: 'Invalid Comment content data' }
  }

  if (!content) {
    return { error: 'Comment content is required' }
  }

  if (containsOnlySpaces(content)) {
    return { error: 'Comment content is required' }
  }

  return { sanitizedString: content, error: null }
}

function containsOnlySpaces(content) {
  return content.trim() === ''
}

export { validateCommentContent }
