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
    <div className="profile-main-container flex flex-col items-center justify-center w-full">
      {userData ? (
        <MyProfileProvider userData={userData}>
          <div className="users-data-container max-w-[800px] w-full">
            <div className="users-data-card glass-blue-soft flex flex-col mx-4 mt-3 md:mt-8 px-4 md:pt-3 pb-3 md:pb-6 md:max-w-[768px] md:rounded-lg md:shadow-center-md">
              <h2 className="users-data-header text-xl font-semibold text-app-blue-800">
                {`${userData.name}'s profile:`}
              </h2>
              <ProfilePreview userData={userData} />
              <div className="users-data flex flex-row items-center my-1 pt-4 border-t border-app-blue/70">
                <h3 className="font-bold text-14">Profession:</h3>
                <p className="font-orbitron font-normal text-14 ml-1">
                  {userData.profession || 'Data Classified'}
                </p>
              </div>

              <div className="users-data flex flex-row items-center my-1">
                <h3 className="font-bold text-14">Organization:</h3>
                <p className="font-orbitron font-normal text-14 ml-1">
                  {userData.organization || 'Data Classified'}
                </p>
              </div>
              <div className="users-data-about-container relative mt-4 pt-4 border-t below-md:pb-4 below-md:border-b border-app-blue/70 transition-height">
                <h3 className="users-data-about-label text-lg font-semibold mb-2">
                  About me:
                </h3>
                <p className="users-data-about-text pb-3 pr-2 md:pr-16">
                  {userData.about}
                </p>
              </div>
            </div>
          </div>
          <div className="posts-wrapper flex flex-col w-full md:max-w-[800px]">
            <h2 className="posts-header relative md:top-6 ml-4 text-xl font-semibold">
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
          <div className="loader-position-adjuster md:max-w-[768px] w-full mt-8">
            <Loader />
            <PostShimmer />
            <PostShimmer />
          </div>
        </>
      )}
    </div>
  )
}
