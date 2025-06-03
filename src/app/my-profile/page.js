'use client'

import { useEffect, useRef, useState } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { countUserComments, countUserPosts } from '@/lib/actions/utils'
import { Loader } from '@/ui/loaders/Loader'
import { MyProfileShimmer } from '@/ui/loaders/MyProfileShimmer'
import { ProfileAbout } from '@/ui/profile/ProfileAbout'
import { ProfileHeader } from '@/ui/profile/ProfileHeader'
import { ProfileMyData } from '@/ui/profile/ProfileMyData'
import { ProfileSettings } from '@/ui/profile/ProfileSettings'
import { useToastContext } from '@/lib/toasts/ToastProvider'
import { MyProfileProvider } from '@/lib/context/MyProfileProvider'
import { getUserPrivate } from '@/lib/actions/user'

export default function MyProfile() {
  const [userData, setUserData] = useState(null)
  const { toastFunctions: toast } = useToastContext()
  const { data: session } = useSession()
  const signingIn = useRef(false)
  const [response, setResponse] = useState({
    state: null,
    message: null,
  })

  useEffect(() => {
    if (!session) {
      //below code fixes firefox issues with calling signIn() in useEffect
      //https://github.com/nextauthjs/next-auth/issues/9177
      if (signingIn.current) return
      signingIn.current = true
      signIn()
      return
    }
    if (session?.user?.id) fetchData()

    async function fetchData() {
      const [fetchedData, postsSum, commentsSum] = await Promise.all([
        getUserPrivate(session.user.id),
        countUserPosts(session.user.id),
        countUserComments(session.user.id),
      ])
      setUserData({
        ...fetchedData,
        postsSum: postsSum,
        commentsSum: commentsSum,
      })
    }
  }, [session])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (response?.state === 'success') {
      toast.success(response.message)
    }
    if (response?.state === 'error') {
      toast.error(response.message)
    }
  }, [response])

  return (
    <>
      {userData ? (
        <MyProfileProvider
          userData={userData}
          setUserData={setUserData}
          setResponse={setResponse}
        >
          <div className="main-container flex justify-center items-center mx-auto mt-3 md:mt-8 px-4 md:w-[800px]">
            <div className="profile-container glass-blue-soft md:px-6 md:pt-3 pb-6 rounded-lg md:shadow-center-md grow">
              <ProfileHeader />
              <ProfileAbout />
              <ProfileMyData />
              <ProfileSettings />
            </div>
          </div>
        </MyProfileProvider>
      ) : (
        <>
          <Loader />
          <MyProfileShimmer />
        </>
      )}
    </>
  )
}
