const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

function getTranslateY(digit) {
  return `-${parseInt(digit, 10) * 10}%`
}

export function RollingNumber({ value = 0, duration = 1000, lineHeight = 26 }) {
  const isNegative = typeof value === 'number' && value < 0
  // create array with non-negative (absolute) number strings
  // minus sign (-) will be handled separately, so its not included
  console.log(value)
  console.log(typeof value)
  const absoluteDigits =
    typeof value === 'number' ? Math.abs(value).toString().split('') : ['0']

  return (
    <span style={{ display: 'inline-flex' }}>
      {/* handle minus (-) sign */}
      {isNegative && (
        <span
          className="digit minus"
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
              transform: 'translateY(0%)',
            }}
          >
            <span>-</span>
          </span>
          <span
            className="value"
            style={{
              color: 'transparent',
              position: 'relative',
            }}
          >
            -
          </span>
        </span>
      )}
      {/* handle number strings */}
      {absoluteDigits.map((digit, idx) => (
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
            {/* render all possible digits as initially transparent */}
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
