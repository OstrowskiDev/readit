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
    <form action={likeCommentWithId} className="rounded-md  hover:bg-gray-200">
      <button className="w-11 h-11 px-[10px] py-2 flex justify-center items-center">
        {isAlreadyLiked ? <LikeIcoActive /> : <LikeIco />}
      </button>
    </form>
  )
}

// w-[28px]
