import React, { useState } from 'react'
import { ToastContext } from './ToastContext'
import { Toast } from './Toast'

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null)

  const toastFunctions = {
    success: (message) => {
      setToast({ message, state: 'success', timestamp: Date.now() })
    },
    error: (message) => {
      setToast({ message, state: 'error', timestamp: Date.now() })
    },
  }

  return (
    <ToastContext.Provider value={toastFunctions}>
      {children}
      {toast && (
        <Toast
          forceUpdate={toast.timestamp}
          message={toast.message}
          state={toast.state}
        />
      )}
    </ToastContext.Provider>
  )
}
