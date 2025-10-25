'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { Avatar } from '@/services/dicebear/Avatar'

export function MobileAvatar() {
  const [userData, setUserData] = useState(null)
  const { data: session } = useSession()

  useEffect(() => {
    if (session?.user) {
      setUserData(session.user)
    } else {
      setUserData(null)
    }
  }, [session])

  return (
    <>
      {userData?.avatar && (
        <a className="mobile-avatar-container my-4 mx-2" href="/my-profile">
          <div className="relative">
            <div className="normal-avatar opacity-1">
              <Avatar
                seed={userData.avatar.seed}
                color={'mobile'}
                size={40}
                border={3}
              />
            </div>
            <div className="hover-avatar opacity-0 absolute top-0 left-0 z-50">
              <Avatar
                seed={userData.avatar.seed}
                color={'mobile-hover'}
                size={40}
                border={3}
              />
            </div>
          </div>
        </a>
      )}
    </>
  )
}
