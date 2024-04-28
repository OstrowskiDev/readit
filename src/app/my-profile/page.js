'use client'

import React, { useEffect, useState } from 'react'
import { getUser } from '../lib/db'
import { signIn, useSession } from 'next-auth/react'
import Avatar from '../lib/avatars/Avatar'
import { countUserComments, countUserPosts } from '../lib/actions'

export default function MyProfile() {
  const [userData, setUserData] = useState(null)
  const [editAbout, setEditAbout] = useState(false)
  const [editData, setEditData] = useState(false)
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
        console.log(fetchedData)
      }
    }
    fetchData()
  }, [session])

  return (
    <>
      {userData && (
        <div className="main-container flex justify-center items-center mx-auto mt-8 px-4 max-w-[800px]">
          <div className="profile-container bg-white p-8 rounded-lg shadow-lg">
            {/* profile header */}
            <div className="profile-header">
              <div className="profile-avatar-name flex items-center mb-4">
                <Avatar
                  seed={userData.avatar.seed}
                  color={userData.avatar.color}
                  size={80}
                  border={2}
                />
                <p className="profile-name ml-2 text-lg font-semibold text-gray-800">
                  {userData.name}
                </p>
              </div>
            </div>

            {/* posts and comments numbers */}
            <div className="posts-comments-numbers-container mt-4 flex">
              <div className="posts-number">
                <p className="posts-number text-gray-950 text-18 font-semibold ">
                  {userData.postsSum}
                </p>
                <p className=" text-gray-600 text-15">Posts Created</p>
              </div>
              <div className="comments-number ml-4">
                <p className="text-gray-950 text-18 font-semibold">
                  {userData.commentsSum}
                </p>
                <p className="text-gray-600 text-15">Comment Created</p>
              </div>
            </div>

            {/* about */}
            <div className="profile-about border-t border-gray-200 mt-4 pt-4">
              <h3 className="profile-label-about text-lg font-semibold text-gray-800 mb-2">
                About
              </h3>
              <p className="profile-about">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
                risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing
                nec, ultricies sed, dolor. Cras elementum ultrices diam.
                Maecenas ligula massa, varius a, semper congue, euismod non
              </p>
            </div>

            {/* user data */}
            <div className="profile-user-data border-t border-gray-200 mt-4 pt-4">
              <h3 className="profile-label-user-data text-lg font-semibold text-gray-800 mb-2">
                Your data
              </h3>
              <div className="user-data-name flex">
                <p className="profile-label-user-data w-20 text-md text-gray-900">
                  name:
                </p>
                <p className="profile-user-data text-md text-gray-600">
                  {userData.name}
                </p>
              </div>
              <div className="user-data-email flex">
                <p className="profile-label-user-data w-20 text-md text-gray-900">
                  email:
                </p>
                <p className="profile-user-data text-md text-gray-600">
                  {userData.email}
                </p>
              </div>
              <div className="user-data-address flex">
                <p className="profile-label-user-data w-20 text-md text-gray-900">
                  address:
                </p>
                <p className="profile-user-data text-md text-gray-600">
                  {userData.address}
                </p>
              </div>
              <div className="user-data-phone flex">
                <p className="profile-label-user-data w-20 text-md text-gray-900">
                  phone:
                </p>
                <p className="profile-user-data text-md text-gray-600">
                  {userData.phone}
                </p>
              </div>
            </div>

            {/* settings */}
            <div className="profile-settings border-t border-gray-200 mt-4 pt-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Settings
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/profile/change-password"
                    className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
                  >
                    Change Password
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
