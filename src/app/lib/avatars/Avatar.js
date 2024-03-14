import { useMemo } from 'react'
import { createAvatar, schema } from '@dicebear/core'
import { loreleiNeutral } from '@dicebear/collection'

export default function Avatar({ seed, color }) {
  // Consider using Just-in-Time (JIT) mode for this in the future.
  let bgColor
  let borderColor
  let fillColor

  switch (color) {
    case 'red':
      bgColor = 'rgb(254 202 202)'
      borderColor = 'rgb(252 165 165)'
      break
    case 'orange':
      bgColor = 'rgb(254 215 170)'
      borderColor = 'rgb(253 186 116)'
      break
    case 'yellow':
      bgColor = 'rgb(254 240 138)'
      borderColor = 'rgb(253 224 71)'
      break
    case 'green':
      bgColor = 'rgb(187 247 208)'
      borderColor = 'rgb(134 239 172)'
      break
    case 'blue':
      bgColor = 'rgb(191 219 254)'
      borderColor = 'rgb(147 197 253)'
      break
    case 'pink':
      bgColor = 'rgb(251 207 232)'
      borderColor = 'rgb(249 168 212)'
      break
    case 'violet':
      bgColor = 'rgb(221 214 254)'
      borderColor = 'rgb(196 181 253)'
      break
  }

  const avatar = useMemo(() => {
    return createAvatar(loreleiNeutral, {
      seed: seed,
      // Prop backgroundColor must be set to any value
      // for backgroundColor inside <img> tag to work properly.
      backgroundColor: ['#60A5FA'],
    }).toDataUriSync()
  }, [])

  return (
    <>
      <div
        className="avatar-border absolute w-12 h-12"
        style={{
          borderColor: borderColor,
          borderWidth: '2px',
          borderRadius: '100px',
        }}
      ></div>
      <img
        // className="bg-violet-300"
        style={{
          backgroundColor: bgColor,
          borderRadius: '100px',
        }}
        src={avatar}
        alt="Avatar"
      />
    </>
  )
}
