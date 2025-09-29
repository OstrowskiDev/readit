import { ErrorIco } from '@/ui/icons/ErrorIco'
import { SuccessIco } from '@/ui/icons/SuccessIco'
import React, { useEffect, useRef, useState } from 'react'

export function Toast({ message, state, forceUpdate }) {
  const [moveToastClass, setMoveToastClass] = useState('hide')
  const timerArrivedRef = useRef()
  const timerRef = useRef()

  useEffect(() => {
    clearTimeout(timerArrivedRef.current)
    clearTimeout(timerRef.current)
    setMoveToastClass('start')
    timerArrivedRef.current = setTimeout(() => {
      setMoveToastClass('show')
    }, 500)
    timerRef.current = setTimeout(() => {
      setMoveToastClass('hide')
    }, 3000)

    return () => {
      clearTimeout(timerArrivedRef.current)
      clearTimeout(timerRef.current)
    }
  }, [message, state, forceUpdate])

  return (
    <div
      className={`toast fixed ml-[120px] below-md:ml-[0px] bottom-0 transform ${moveToastClass} z-50`}
      aria-live={state === 'error' ? 'assertive' : 'polite'}
      role={state === 'error' ? 'alert' : 'status'}
      aria-atomic="true"
    >
      <div
        className={`toast-container flex items-center w-80 h-[74px] mx-auto p-4 mb-16 font-semibold border-2 rounded-xl ${containerStateClasses(
          state,
        )}`}
      >
        <div className="toast-icon w-10" aria-hidden="true">
          {renderIcon(state)}
        </div>
        <div className="toast-text-container ml-4">
          <p
            className={`toast-text-state leading-tight text-lg ${textStateClasses(
              state,
            )}`}
          >
            {capitalizeFirstLetter(state) + '!'}
          </p>
          <p
            className={`toast-text-message leading-tight text-sm text-app-blue-text/80`}
          >
            {message}
          </p>
        </div>
      </div>
    </div>
  )
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function containerStateClasses(state) {
  switch (state) {
    case 'success':
      return 'glass-blue-soft border-green-400'
    case 'error':
      return 'glass-blue-soft border-red-400'
  }
}

function textStateClasses(state) {
  switch (state) {
    case 'success':
      return 'text-green-400'
    case 'error':
      return 'text-red-400'
  }
}

function renderIcon(state) {
  switch (state) {
    case 'success':
      return <SuccessIco />
    case 'error':
      return <ErrorIco />
  }
}
