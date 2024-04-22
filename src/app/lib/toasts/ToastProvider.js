import React, { useState, useCallback } from 'react'
import { ToastContext } from './ToastContext'
import { Toast } from './Toast'

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null)

  const toastFunctions = {
    success: useCallback((message) => {
      setToast({ message, state: 'success' })
      setTimeout(() => setToast(null), 3000)
    }, []),
    error: useCallback((message) => {
      setToast({ message, state: 'error' })
      setTimeout(() => setToast(null), 3000)
    }, []),
  }

  return (
    <ToastContext.Provider value={toastFunctions}>
      {children}
      {toast && <Toast message={toast.message} state={toast.state} />}
    </ToastContext.Provider>
  )
}
