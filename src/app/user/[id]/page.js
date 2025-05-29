'use client'

import { countUserComments, countUserPosts } from '@/lib/actions/utils'
import PostsPage from '@/app/posts/page'
import { Loader } from '@/ui/loaders/Loader'
import { UserProfileShimmer } from '@/ui/loaders/UserProfileShimmer'
import { ProfilePreview } from '@/ui/profile/ProfilePreview'
import { useEffect, useState } from 'react'
import { getUser } from '@/lib/actions/user'
import { useSearchParams } from 'next/navigation'
import { MyProfileProvider } from '@/lib/context/MyProfileProvider'
import { PostShimmer } from '@/ui/loaders/PostShimmer'

export default function UserProfile({ params }) {
  const searchParams = useSearchParams()
  const searchParamsObj = Object.fromEntries(searchParams.entries())
  const [userData, setUserData] = useState(null)

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <div className="profile-main-container flex flex-col justify-center w-full">
      {userData ? (
        <MyProfileProvider userData={userData}>
          <div className="users-data-container max-w-[800px] w-full">
            <h1 className="users-data-header flex flex-col mt-3 md:mt-6 md:mb-2 ml-4 text-xl font-semibold text-gray-800">
              {`${userData.name}'s profile:`}
            </h1>

            <div className="users-data-card flex flex-col mx-4 px-4 md:pt-3 pb-3 md:pb-6 md:max-w-[768px] bg-white md:rounded-lg md:shadow-center-md">
              <ProfilePreview userData={userData} />
              <p className="users-data text-gray-600 text-14 mt-4 pt-4 font-orbitron border-t border-gray-200">
                Profession: {userData.profession || 'Data Classified'}
              </p>
              <p className="users-data text-gray-600 text-14 my-1 font-orbitron">
                Organization: {userData.organization || 'Data Classified'}
              </p>
              <div className="users-data-about-container relative mt-4 pt-4 border-t below-md:pb-4 below-md:border-b border-gray-200 transition-height">
                <h3 className="users-data-about-label text-lg font-semibold text-gray-800 mb-2">
                  About me:
                </h3>
                <p className="users-data-about-text pb-3 pr-2 md:pr-16">
                  {userData.about}
                </p>
              </div>
            </div>
          </div>
          <div className="posts-wrapper md:max-w-[800px]">
            <h2 className="posts-header relative md:top-6 ml-4 text-xl font-semibold text-gray-900">
              {`${userData.name}'s posts:`}
            </h2>
            <PostsPage
              searchParams={searchParamsObj}
              pageTitle={''}
              disableCreateBtn={true}
              disableFilteringByAuthor={true}
              forceAuthorName={userData.name}
            />
          </div>
        </MyProfileProvider>
      ) : (
        <>
          <UserProfileShimmer />
          <div className="loader-position-adjuster mt-8 mr-16">
            <Loader />
            <PostShimmer />
            <PostShimmer />
          </div>
        </>
      )}
    </div>
  )
}
