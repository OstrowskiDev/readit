'use client'

import { signIn, useSession } from 'next-auth/react'
import { useEffect, useRef, useState } from 'react'
import { countUserComments, countUserPosts } from '../lib/actions/utils'
import { getUserPrivate } from '../lib/db'
import { ProfileAbout } from '../ui/ProfileAbout'
import { ProfileHeader } from '../ui/ProfileHeader'
import { ProfileMyData } from '../ui/ProfileMyData'
import { ProfileSettings } from '../ui/ProfileSettings'
import { Loader } from '../ui/loaders/Loader'
import { MyProfileShimmer } from '../ui/loaders/MyProfileShimmer'

export default function MyProfile() {
  const [userData, setUserData] = useState(null)
  const { data: session } = useSession()
  const signingIn = useRef(false)

  useEffect(() => {
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

    if (!session) {
      //below code to fix firefox issues with calling signIn() in useEffect
      //reference to github next-auth issue 9177:
      //https://github.com/nextauthjs/next-auth/issues/9177
      if (signingIn.current) return
      signingIn.current = true
      signIn()
      return
    }

    if (session?.user?.id) {
      fetchData()
    }
  }, [session])

  return (
    <>
      {userData ? (
        <div className="main-container flex justify-center items-center mx-auto mt-3 md:mt-8 px-4 md:w-[800px]">
          <div className="profile-container bg-white md:px-6 md:pt-3 pb-6 rounded-lg md:shadow-center-md grow">
            <ProfileHeader userData={userData} setUserData={setUserData} />
            <ProfileAbout userData={userData} setUserData={setUserData} />
            <ProfileMyData userData={userData} setUserData={setUserData} />
            <ProfileSettings />
          </div>
        </div>
      ) : (
        <>
          <Loader />
          <MyProfileShimmer />
        </>
      )}
    </>
  )
}
