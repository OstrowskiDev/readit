import { createAvatar } from '@dicebear/core'
import { loreleiNeutral } from '@dicebear/collection'

export default function Avatar({ seed, color, size, border }) {
  // Consider using Just-in-Time mode for this in the future.
  let bgColor
  let borderColor

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

  const avatar = createAvatar(loreleiNeutral, {
    seed: seed,
    backgroundColor: ['#fff'], // must be set to any value for backgroundColor inside <img> tag to work properly.
  }).toDataUriSync()

  return (
    <>
      <div
        className="avatar-container"
        style={{
          height: `${size}px`,
          width: `${size}px`,
          borderColor: borderColor,
          borderWidth: `${border}px`,
          borderRadius: '100px',
        }}
      >
        <img
          style={{
            backgroundColor: bgColor,
            borderRadius: '100px',
          }}
          src={avatar}
          alt="Avatar"
        />
      </div>
    </>
  )
}
