import React from 'react'

const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

function getTranslateY(digit) {
  if (digit === '-') return '-100%'
  return `-${parseInt(digit, 10) * 10}%`
}

export function RollingNumber({ value = 0, duration = 1000, lineHeight = 26 }) {
  const digits = typeof value === 'number' ? value.toString().split('') : ['0']

  return (
    <span style={{ display: 'inline-flex' }}>
      {digits.map((digit, idx) => (
        <span
          key={idx}
          className="digit"
          style={{
            lineHeight: `${lineHeight}px`,
            width: '1ch',
            overflow: 'hidden',
            display: 'inline-flex',
            position: 'relative',
          }}
        >
          <span
            className="scale"
            aria-hidden="true"
            style={{
              userSelect: 'none',
              position: 'absolute',
              left: 0,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              transition: `transform ${duration}ms`,
              transform: `translateY(${getTranslateY(digit)})`,
            }}
          >
            {DIGITS.map((d) => (
              <span key={d}>{d}</span>
            ))}
          </span>
          <span
            className="value"
            style={{
              color: 'transparent',
              position: 'relative',
            }}
          >
            {digit}
          </span>
        </span>
      ))}
    </span>
  )
}
