export const toast = { state: '', message: '' }

export function setToast(state, message) {
  toast.state = state
  toast.message = message
}

export function resetToast() {
  toast.state = ''
  toast.message = ''
}

export function returnToast(state, message) {
  return { state: state, message: message }
}
