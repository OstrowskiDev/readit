function addMessage(validationResults, field, messageText) {
  const alreadyExists = validationResults[field].message.some(
    (msg) => msg === messageText,
  )
  if (alreadyExists) return
  validationResults[field].message.push(messageText)
}

function removeMessage(validationResults, field, messageText) {
  const filteredMessages = validationResults[field].message.filter(
    (msg) => msg !== messageText,
  )
  validationResults[field].message = filteredMessages
}

export function validateField(
  validationResults,
  field,
  validationFn,
  messageText,
) {
  if (validationFn()) {
    addMessage(validationResults, field, messageText)
  } else {
    removeMessage(validationResults, field, messageText)
  }
}
