'use client'

import { getUserPostsIds } from '@/app/lib/actions'
import { Post } from '@/app/ui/Post'
// need to implement lazy loading or other susspense / loading strat
// import { UserInfoboxLoader } from '@/app/ui/loaders/UserInfoboxLoader'
import { Suspense, lazy, useEffect, useState } from 'react'
// const LazyPost = lazy(() => import('@/app/ui/Post'))

export default function UserPosts({ params }) {
  const [userPosts, setUserPosts] = useState(null)
  const [authorsData, setAuthorsData] = useState([])
  const userId = params.id

  useEffect(() => {
    async function fetchData() {
      const posts = await getUserPostsIds(userId)
      setUserPosts(posts)
    }
    fetchData()
  }, [])

  return (
    <div className="w-full flex flex-col justify-center my-8 px-4">
      {userPosts?.map((postId) => (
        <Post
          key={postId}
          postId={postId}
          authorsData={authorsData}
          setAuthorsData={setAuthorsData}
        />
      ))}
      {/* {userPosts?.map((postId) => (
        <Suspense fallback={<UserInfoboxLoader />}>
          <LazyPost
            key={postId}
            postId={postId}
            authorsData={authorsData}
            setAuthorsData={setAuthorsData}
          />
        </Suspense>
      ))} */}
    </div>
  )
}
