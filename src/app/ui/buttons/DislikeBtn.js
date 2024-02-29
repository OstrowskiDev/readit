'use client'

import { useSession } from 'next-auth/react'
import { handleDislikeClick } from '@/app/lib/actions'
import { DislikeIco } from '../icons/DislikeIco'
import { DislikeIcoActive } from '../icons/DislikeIcoActive'
import { useCommentContext } from '@/app/lib/context/CommentContextProvider'

export function DislikeBtn() {
  const { commentId, postId, commentDislikes } = useCommentContext()
  const { data: session } = useSession()
  const userId = session?.user?.id
  const isAlreadyDisliked = commentDislikes?.includes(userId)
  const collection = 'comments'

  const handleDislikeWithId = handleDislikeClick.bind(null, commentId, postId, collection)

  return (
    <form action={handleDislikeWithId} className="ml-[1px] rounded-md hover:bg-gray-200">
      <button className="w-11 h-11 px-[10px] pt-[9px] pb-[7px] flex justify-center items-center">
        {isAlreadyDisliked ? <DislikeIcoActive /> : <DislikeIco />}
      </button>
    </form>
  )
}
