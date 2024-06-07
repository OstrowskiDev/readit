'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Avatar from '../lib/avatars/Avatar'

export function MobileAvatar() {
  const [userData, setUserData] = useState(null)
  const { data: session } = useSession()

  useEffect(() => {
    if (session.user) {
      setUserData(session.user)
    }
  }, [session])

  return (
    <>
      {userData?.avatar && (
        <div className=" mobile-avatar-container my-4 mx-2">
          <div className="relative">
            <Avatar
              seed={userData.avatar.seed}
              color={'background-blue'}
              size={40}
              border={3}
            />
          </div>
        </div>
      )}
    </>
  )
}
