'use client'

import { getUserPostsIds } from '@/app/lib/actions'
import { Post } from '@/app/ui/Post'
import { useEffect, useState } from 'react'

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
    <div className="w-full flex justify-center my-8 px-4">
      <div className="flex flex-col">
        {userPosts?.map((postId) => (
          <Post
            key={postId}
            postId={postId}
            authorsData={authorsData}
            setAuthorsData={setAuthorsData}
            enableCommentBtn={false}
          />
        ))}
      </div>
    </div>
  )
}
