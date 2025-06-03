import React from 'react'

export function ShimmerArc({ radius = 20, strokeWidth = 1, className = '' }) {
  const startX = radius
  const startY = 0
  const endX = 0
  const endY = radius

  const pathData = `M ${startX} ${startY} A ${radius} ${radius} 0 0 1 ${endX} ${endY}`

  const size = radius + strokeWidth

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${radius} ${radius}`}
      className={className}
      strokeWidth={strokeWidth}
      stroke="currentColor"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={pathData} />
    </svg>
  )
}
