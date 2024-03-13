import { useMemo } from 'react'
import { createAvatar } from '@dicebear/core'
import { loreleiNeutral } from '@dicebear/collection'

export function AvatarCali() {
  const avatar = useMemo(() => {
    return createAvatar(loreleiNeutral, {
      seed: 'Cali',
      size: 128,
      // ... other options
    }).toDataUriSync()
  }, [])

  return <img className="rounded-full" src={avatar} alt="Avatar" />
}
