import { useMemo } from 'react'
import { createAvatar, schema } from '@dicebear/core'
import { loreleiNeutral } from '@dicebear/collection'

export default function Avatar({ seed, bgColor, borderColor }) {
  // Consider using Just-in-Time (JIT) mode for this in the future.

  const avatar = useMemo(() => {
    return createAvatar(loreleiNeutral, {
      seed: seed,
      // Prop backgroundColor must be set to any value
      // for backgroundColor inside <img> tag to work properly.
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

//oragne:
// backgroundColor: 'rgb(254 215 170)',
// borderColor: 'rgb(253 186 116)',

//red:
// backgroundColor: 'rgb(254 202 202)',
// borderColor: 'rgb(252 165 165)',
