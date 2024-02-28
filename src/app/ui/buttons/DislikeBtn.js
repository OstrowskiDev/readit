'use client'

import { useSession } from 'next-auth/react'
import { dislikeComment } from '@/app/lib/actions'
import { DislikeIco } from '../icons/DislikeIco'
import { DislikeIcoActive } from '../icons/DislikeIcoActive'
import { useCommentContext } from '@/app/lib/context/CommentContextProvider'

export function DislikeBtn() {
  const { commentId, postId, commentDislikes } = useCommentContext()
  const { data: session } = useSession()
  const userId = session?.user?.id
  const isAlreadyDisliked = commentDislikes?.includes(userId)

  const dislikeCommentWithId = dislikeComment.bind(null, commentId, postId)

  return (
    <form action={dislikeCommentWithId} className="p-[3px] rounded-md hover:bg-gray-200">
      <button className="w-[22px] m-1 pt-1 flex justify-center items-center">
        {isAlreadyDisliked ? <DislikeIcoActive /> : <DislikeIco />}
      </button>
    </form>
  )
}

// dislikeComment(commentId, postId)
