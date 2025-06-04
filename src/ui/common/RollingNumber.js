'use client'

import { useEffect, useRef } from 'react'

export default function RollingNumber({
  value = 0,
  duration = 750,
  className = '',
  isMounted,
  setIsMounted,
}) {
  const ref = useRef(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    import('@layflags/rolling-number')
  }, [])

  if (!isMounted) return null

  return (
    <layflags-rolling-number
      ref={ref}
      value={value}
      class={className}
      style={{ '--roll-duration': `${duration}ms` }}
    >
      {value}
    </layflags-rolling-number>
  )
}
