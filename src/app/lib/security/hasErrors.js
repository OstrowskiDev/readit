export function hasErrors(validationResults) {
  return Object.values(validationResults).some(
    (field) => field.message.length > 0,
  )
}
