import validator from 'validator'
import sanitizeHtml from 'sanitize-html'

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
  //I cant find option for sanitizeHtml to remove only html tags and not change <, >, & characters
  //below is brute force approach to achieve this but its not perfect
  //IMPORTANT: to check how leting users to input <, >, & characters can potentially affect XSS voulnerbility inside nextjs app
  function decodeHtmlEntities(inputString) {
    return inputString.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
  }

  let sanitizedContent = sanitizeHtml(inputContent, {
    allowedTags: [],
  })

  sanitizedContent = decodeHtmlEntities(sanitizedContent)

  return sanitizedContent
}

export { validatePostTitle, validateContent }
