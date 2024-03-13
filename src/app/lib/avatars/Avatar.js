import { useMemo } from 'react'
import { createAvatar, schema } from '@dicebear/core'
import { loreleiNeutral } from '@dicebear/collection'

export default function Avatar({ seed, bgColor, borderColor }) {
  // Tailwind utility classes dont work well with this library.
  // Prop backgroundColor must be set to any value inside options body
  // for backgroundColor inside <img> tag to work properly.

  const avatar = useMemo(() => {
    return createAvatar(loreleiNeutral, {
      seed: seed,
      backgroundColor: ['#60A5FA'],
    }).toDataUriSync()
  }, [])

  return (
    <img
      style={{
        backgroundColor: bgColor,
        borderColor: borderColor,
        borderWidth: '2px',
        borderRadius: '100px',
      }}
      src={avatar}
      alt="Avatar"
    />
  )
}

// bg-${color}-${opacity}  border-${color}-${opacity + 100}

//oragne:
// backgroundColor: 'rgb(254 215 170)',
// borderColor: 'rgb(253 186 116)',

//red:
// backgroundColor: 'rgb(254 202 202)',
// borderColor: 'rgb(252 165 165)',
