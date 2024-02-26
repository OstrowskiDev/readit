'use client'

import { likeComment } from '@/app/lib/actions'
import { LikeIco } from '../icons/LikeIco'
import { LikeIcoActive } from '../icons/LikeIcoActive'
import { useCommentContext } from '@/app/lib/context/CommentContextProvider'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export async function LikeBtn() {
  const { commentId, postId } = useCommentContext()
  const { data: session } = useSession()
  const [likeData, setLikeData] = useState(null)
  const userId = session?.user?.id

  useEffect(() => {
    if (session.user.id) {
      fetch(`http://localhost:3000/api/likes/like/find/${commentId}/${userId}`, {
        cache: 'no-store',
      })
        .then((res) => {
          if (!res.ok) return null
          return res.json()
        })
        .then((data) => {
          setLikeData(data)
        })
        .catch((error) => {
          console.error('Error fetching data:', error)
        })
    }
  }, [])

  // console.log(`logging session inside LikeBtn`)
  // console.log(session)
  // console.log(`logging session.user.id: ${session?.user?.id}`)
  // console.log(`commentId is: ${commentId}`)
  // console.log(`userId is: ${userId}`)
  // console.log(`likeObject is:`)
  // console.log(likeData)
  const userLikes = Boolean(likeData)
  // const userLikes = false

  const likeCommentWithId = likeComment.bind(null, commentId, postId)

  return (
    <form action={likeCommentWithId} className="p-[3px] rounded-md hover:bg-gray-200">
      <button className="w-[22px] m-1 flex justify-center items-center">
        {userLikes ? <LikeIcoActive /> : <LikeIco />}
      </button>
    </form>
  )
}
