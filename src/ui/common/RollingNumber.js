'use client'

import { useEffect, useRef } from 'react'

export default function RollingNumber({
  value = 0,
  duration = 750,
  className = '',
}) {
  const ref = useRef(null)

  useEffect(() => {
    import('@layflags/rolling-number')
  }, [])

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
