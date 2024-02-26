'use client'

import { likeComment } from '@/app/lib/actions'
import { LikeIco } from '../icons/LikeIco'
import { LikeIcoActive } from '../icons/LikeIcoActive'
import { useCommentContext } from '@/app/lib/context/CommentContextProvider'
import { useSession } from 'next-auth/react'

export function LikeBtn() {
  const { commentId, postId, commentLikes } = useCommentContext()
  const { data: session } = useSession()
  const userId = session?.user?.id
  const isAlreadyLiked = commentLikes?.includes(userId)

  const likeCommentWithId = likeComment.bind(null, commentId, postId)

  return (
    <form action={likeCommentWithId} className="p-[3px] rounded-md hover:bg-gray-200">
      <button className="w-[22px] m-1 flex justify-center items-center">
        {isAlreadyLiked ? <LikeIcoActive /> : <LikeIco />}
      </button>
    </form>
  )
}
