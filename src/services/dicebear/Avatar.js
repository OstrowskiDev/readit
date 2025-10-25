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
          borderRadius: '50%',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          style={{
            backgroundColor: bgColor,
            borderColor: borderColor,
            borderWidth: `${border}px`,
            borderRadius: '50%',
          }}
          src={avatar}
          alt=""
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
      bgColor = 'rgb(240, 181, 195)'
      borderColor = 'rgb(255, 144, 170)'
      break
    case 'orange':
      bgColor = 'rgb(254, 215, 170)'
      borderColor = 'rgb(253, 186, 116)'
      break
    case 'yellow':
      bgColor = 'rgb(255, 253, 237)'
      borderColor = 'rgb(255, 228, 19)'
      break
    case 'green':
      bgColor = 'rgb(187, 247, 208)'
      borderColor = 'rgb(134, 239, 172)'
      break
    case 'blue':
      bgColor = 'rgb(221, 249, 252)'
      borderColor = 'rgb(182, 246, 255)'
      break
    case 'pink':
      bgColor = 'rgb(251, 207, 232)'
      borderColor = 'rgb(249, 168, 212)'
      break
    case 'violet':
      bgColor = 'rgb(203, 163, 255)'
      borderColor = 'rgb(173, 113, 252)'
      break
    case 'mobile':
      bgColor = 'transparent'
      borderColor = 'rgb(163, 244, 255)'
      fillColor = 'A3F4FF'
      break
    case 'mobile-hover':
      bgColor = 'transparent'
      borderColor = 'rgb(250, 124, 56)'
      fillColor = 'fa7c38'
      break
    default:
      bgColor = 'transparent'
      borderColor = 'transparent'
  }

  return { bgColor, borderColor, fillColor }
}
