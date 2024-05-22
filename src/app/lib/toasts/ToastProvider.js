import { useState, useContext } from 'react'
import { Toast } from './Toast'
import { ToastContext } from './ToastContext'

export function ToastProvider({ children, authorsData, setAuthorsData }) {
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
    <ToastContext.Provider
      value={{
        toastFunctions,
        authorsData,
        setAuthorsData,
      }}
    >
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

export function useToastContext() {
  return useContext(ToastContext)
}
