'use client'

import React, { useEffect, useState } from 'react'
import { getUser } from '../lib/db'
import { signIn, useSession } from 'next-auth/react'
import { countUserComments, countUserPosts } from '../lib/actions'
import { ProfileSettings } from '../ui/ProfileSettings'
import { ProfileHeader } from '../ui/ProfileHeader'
import { ProfileMyData } from '../ui/ProfileMyData'
import { ProfileAbout } from '../ui/ProfileAbout'

export default function MyProfile() {
  const [userData, setUserData] = useState(null)
  const { data: session } = useSession()
  if (!session) signIn()

  useEffect(() => {
    async function fetchData() {
      if (session.user.id) {
        const [fetchedData, postsSum, commentsSum] = await Promise.all([
          getUser(session.user.id),
          countUserPosts(session.user.id),
          countUserComments(session.user.id),
        ])
        setUserData({
          ...fetchedData,
          postsSum: postsSum,
          commentsSum: commentsSum,
        })
      }
    }
    fetchData()
  }, [session])

  return (
    <>
      {userData && (
        <div className="main-container flex justify-center items-center mx-auto mt-8 px-4 w-[800px]">
          <div className="profile-container bg-white p-8 rounded-lg shadow-center-sm grow">
            <ProfileHeader userData={userData} setUserData={setUserData} />
            <ProfileAbout userData={userData} setUserData={setUserData} />
            <ProfileMyData userData={userData} setUserData={setUserData} />
            <ProfileSettings />
          </div>
        </div>
      )}
    </>
  )
}
