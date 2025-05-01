import { createAvatar } from '@dicebear/core'
import { loreleiNeutral } from '@dicebear/collection'

export function Avatar({ seed, color, size, border }) {
  const { bgColor, borderColor, fillColor } = getAvatarColors(color)

  const avatar = createAvatar(loreleiNeutral, {
    seed: seed,
    eyebrowsColor: [fillColor],
    eyesColor: [fillColor],
    frecklesColor: [fillColor],
    glassesColor: [fillColor],
    mouthColor: [fillColor],
    noseColor: [fillColor],
    backgroundColor: ['transparent'],
  }).toDataUriSync()

  return (
    <>
      <div
        className={`avatar-container avatar-${seed.toLowerCase()}-${color}`}
        style={{
          height: `${size}px`,
          width: `${size}px`,
          borderColor: borderColor,
          borderWidth: `${border}px`,
          borderRadius: '100px',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
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

export function getAvatarColors(color) {
  let bgColor
  let borderColor
  let fillColor = '000000'

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
    case 'background-blue':
      bgColor = 'rgb(59 130 246)'
      borderColor = 'rgb(255 255 255)'
      fillColor = 'FFFFFF'
      break
    default:
      bgColor = 'transparent'
      borderColor = 'transparent'
  }

  return { bgColor, borderColor, fillColor }
}
