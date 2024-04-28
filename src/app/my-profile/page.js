'use client'

import React, { useEffect, useState } from 'react'
import { getUser } from '../lib/db'
import { signIn, useSession } from 'next-auth/react'
import Avatar from '../lib/avatars/Avatar'
import { countUserComments, countUserPosts } from '../lib/actions'
import { EditIco } from '../ui/icons/EditIco'

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
          <div className="profile-container bg-white p-8 rounded-lg shadow-center-sm">
            {/* profile header */}
            <div className="profile-header relative">
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
              <div className="avatar-edit-btn absolute top-1 right-1 p-2 w-10 h-10 hover:bg-gray-200 hover:cursor-pointer rounded-md">
                <EditIco />
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
            <div className="profile-about border-t relative border-gray-200 mt-4 pt-4">
              <h3 className="profile-label-about text-lg font-semibold text-gray-800 mb-2">
                About
              </h3>
              <p className="profile-about pr-16">{userData.about}</p>
              <div className="about-edit-btn absolute top-2 right-1 p-2 w-10 h-10 hover:bg-gray-200 hover:cursor-pointer rounded-md">
                <EditIco />
              </div>
            </div>

            {/* user data */}
            <div className="profile-user-data relative border-t border-gray-200 mt-4 pt-4">
              <h3 className="profile-label-user-data text-lg font-semibold text-gray-800 mb-2">
                Your data
              </h3>
              {editData ? (
                <UserDataForm
                  userData={userData}
                  setUserData={setUserData}
                  setEditData={setEditData}
                />
              ) : (
                <ProfileUserData userData={userData} />
              )}

              <div
                className="user-data-edit-btn absolute top-2 right-1 p-2 w-10 h-10 hover:bg-gray-200 hover:cursor-pointer rounded-md"
                onClick={() => setEditData((prevValue) => !prevValue)}
              >
                <EditIco />
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

function ProfileUserData({ userData }) {
  return (
    <div className="user-data-container">
      <div className="user-data-name flex items-center">
        <p className="profile-label-user-data w-20 text-md text-gray-900">
          name:
        </p>
        <p className="profile-user-data px-[9px] my-[5px] text-md text-gray-600">
          {userData.name}
        </p>
      </div>
      <div className="user-data-email flex items-center">
        <p className="profile-label-user-data w-20 text-md text-gray-900">
          email:
        </p>
        <p className="profile-user-data px-[9px] my-[5px] text-md text-gray-600">
          {userData.email}
        </p>
      </div>
      <div className="user-data-address flex items-center">
        <p className="profile-label-user-data w-20 text-md text-gray-900">
          address:
        </p>
        <p className="profile-user-data px-[9px] my-[5px] text-md text-gray-600">
          {userData.address}
        </p>
      </div>
      <div className="user-data-phone flex items-center">
        <p className="profile-label-user-data w-20 text-md text-gray-900">
          phone:
        </p>
        <p className="profile-user-data px-[9px] my-[5px] text-md text-gray-600">
          {userData.phone}
        </p>
      </div>
    </div>
  )
}

function UserDataForm({ userData, setUserData, setEditData }) {
  const [formState, setFormState] = useState(userData)

  const handleChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setUserData(formState)
    setEditData((prevValue) => !prevValue)
    //add function to update user data in db
  }

  const handleCancel = () => {
    setEditData((prevValue) => !prevValue)
  }

  return (
    <form className="user-data-container">
      <div className="user-data-name flex items-center">
        <label className="profile-label-user-data w-20 text-md text-gray-900">
          name:
        </label>
        <input
          className="profile-user-data w-[330px] px-2 text-md text-gray-900 my-1 bg-gray-100 border border-gray-300 rounded-md"
          name="name"
          value={formState.name}
          onChange={handleChange}
        />
      </div>
      <div className="user-data-email flex items-center">
        <label className="profile-label-user-data w-20 text-md text-gray-900">
          email:
        </label>
        <input
          className="profile-user-data w-[330px] px-2 text-md text-gray-900 my-1 bg-gray-100 border border-gray-300 rounded-md"
          name="email"
          value={formState.email}
          onChange={handleChange}
        />
      </div>
      <div className="user-data-address flex items-center">
        <label className="profile-label-user-data w-20 text-md text-gray-900">
          address:
        </label>
        <input
          className="profile-user-data w-[330px] px-2 text-md text-gray-900 my-1 bg-gray-100 border border-gray-300 rounded-md"
          name="address"
          value={formState.address}
          onChange={handleChange}
        />
      </div>
      <div className="user-data-phone flex items-center">
        <label className="profile-label-user-data w-20 text-md text-gray-900">
          phone:
        </label>
        <input
          className="profile-user-data w-[330px] px-2 text-md text-gray-900 my-1 bg-gray-100 border border-gray-300 rounded-md"
          name="phone"
          value={formState.phone}
          onChange={handleChange}
        />
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleCancel}
          className="form-cancel-button py-[6px] px-4 mt-3 bg-gray-200 hover:bg-gray-300 text-gray-600 hover:text-gray-700 font-bold rounded ml-4"
        >
          Cancel
        </button>

        <button
          type="submit"
          onClick={handleSubmit}
          className="form-submit-button py-[6px] px-4 mt-3 ml-4 bg-blue-500 hover:bg-blue-600 text-white font-bold  rounded"
        >
          Save changes
        </button>
      </div>
    </form>
  )
}
