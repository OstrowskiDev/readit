'use client'

import React, { useEffect, useRef, useState } from 'react'
import { getUserPrivate } from '../lib/db'
import { signIn, useSession } from 'next-auth/react'
import { countUserComments, countUserPosts } from '../lib/actions'
import { ProfileSettings } from '../ui/ProfileSettings'
import { ProfileHeader } from '../ui/ProfileHeader'
import { ProfileMyData } from '../ui/ProfileMyData'
import { ProfileAbout } from '../ui/ProfileAbout'
import { MyProfileShimmer } from '../ui/loaders/MyProfileShimmer'
import { Loader } from '../ui/loaders/Loader'

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
        <div className="main-container flex justify-center items-center mx-auto mt-8 px-4 w-[800px]">
          <div className="profile-container bg-white px-6 pt-3 pb-6 rounded-lg shadow-center-sm grow">
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
