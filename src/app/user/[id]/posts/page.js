'use client'

import { countUserComments, countUserPosts } from '@/app/lib/actions'
import { getUser } from '@/app/lib/db'
import PostsPage from '@/app/posts/page'
import { ProfilePreview } from '@/app/ui/ProfilePreview'
import { useEffect, useState } from 'react'

export default function UserProfile({ params, searchParams }) {
  const [userData, setUserData] = useState(null)
  const displayedPostsAuthor = params.id

  useEffect(() => {
    async function fetchData() {
      const [fetchedData, postsSum, commentsSum] = await Promise.all([
        getUser(params.id),
        countUserPosts(params.id),
        countUserComments(params.id),
      ])
      setUserData({
        ...fetchedData,
        postsSum: postsSum,
        commentsSum: commentsSum,
      })
    }
    fetchData()
  }, [])

  return (
    <>
      {userData && (
        <div className="profile-main-container flex flex-col mx-auto">
          <h1 className="profile-title mt-6 mb-2 ml-4 text-2xl font-semibold text-gray-900">
            Profile Page
          </h1>
          <div className="profile-user-data-container flex flex-col relative left-[10px] px-4 pt-3 pb-6 w-[800px] bg-white rounded-lg shadow-center-sm">
            <ProfilePreview userData={userData} />
            <div className="profile-about-container relative mt-4 pt-4 border-t border-gray-200 transition-height">
              <h3 className="profile-about-label text-lg font-semibold text-gray-800 mb-2">
                About me:
              </h3>
              <p className="profile-about pb-2 pr-16">{userData.about}</p>
            </div>
          </div>
          <PostsPage
            searchParams={searchParams}
            onlyCurrentUserPosts={false}
            displayedPostsAuthor={displayedPostsAuthor}
          />
        </div>
      )}
    </>
  )
}
