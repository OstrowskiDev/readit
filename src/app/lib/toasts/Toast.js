import SuccessIco from '@/app/ui/icons/SuccessIco'
import React from 'react'

export function Toast({ message, state }) {
  const containerStateClasses = () => {
    switch (state) {
      case 'success':
        return 'bg-green-50 border-green-500'
      case 'error':
        return 'bg-red-50 border-red-500'
    }
  }

  const textStateClasses = () => {
    switch (state) {
      case 'success':
        return 'text-green-600'
      case 'error':
        return 'text-red-600'
    }
  }

  return (
    <div
      className={`toast flex items-center fixed w-80 h-16 p-4 m-8 font-semibold border-2 rounded-xl 
      bottom-0 left-1/2 transform -translate-x-1/2 ${containerStateClasses()}`}
    >
      <div className="toast-icon w-10">
        <SuccessIco />
      </div>
      <div className="toast-text ml-4">
        <p
          className={`toast-text-state leading-tight text-lg ${textStateClasses()}`}
        >
          {capitalizeFirstLetter(state) + '!'}
        </p>
        <p className="toast-text-message leading-tight text-sm text-gray-700">
          {message}
        </p>
      </div>
    </div>
  )
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
