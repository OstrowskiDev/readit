import { ErrorIco } from '@/app/ui/icons/ErrorIco'
import { SuccessIco } from '@/app/ui/icons/SuccessIco'
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
      className={`toast fixed w-full ml-[120px] below-md:ml-[0px] bottom-0 transform ${moveToastClass}`}
    >
      <div
        className={`toast-container flex items-center w-80 h-[74px] mx-auto p-4 mb-16 font-semibold border-2 rounded-xl ${containerStateClasses(
          state,
        )}`}
      >
        <div className="toast-icon w-10">{renderIcon(state)}</div>
        <div className="toast-text-container ml-4">
          <p
            className={`toast-text-state leading-tight text-lg ${textStateClasses(
              state,
            )}`}
          >
            {capitalizeFirstLetter(state) + '!'}
          </p>
          <p className="toast-text-message leading-tight text-sm text-gray-700">
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
      return 'bg-green-50 border-green-500'
    case 'error':
      return 'bg-red-50 border-red-500'
  }
}

function textStateClasses(state) {
  switch (state) {
    case 'success':
      return 'text-green-600'
    case 'error':
      return 'text-red-600'
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
