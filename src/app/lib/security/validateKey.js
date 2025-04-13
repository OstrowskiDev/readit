export function validateKey(key) {
  if (!key) return false

  const regex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\.webp$/i
  const isValidKey = regex.test(key)

  if (!isValidKey) {
    return false
  }
  return true
}
