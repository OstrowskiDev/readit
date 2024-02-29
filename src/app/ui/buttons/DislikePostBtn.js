'use client'

import { useSession } from 'next-auth/react'
import { handleDislikeClick } from '@/app/lib/actions'
import { DislikeIco } from '../icons/DislikeIco'
import { DislikeIcoActive } from '../icons/DislikeIcoActive'

export function DislikePostBtn({ postId, postDislikes }) {
  const { data: session } = useSession()
  const userId = session?.user?.id
  const isAlreadyDisliked = postDislikes?.includes(userId)
  const collection = 'posts'

  const handleDislikeWithId = handleDislikeClick.bind(null, postId, postId, collection)

  return (
    <form action={handleDislikeWithId} className="rounded-md hover:bg-gray-300">
      <button className="w-11 h-10 px-[10px] pt-[3px] flex justify-center items-center">
        {isAlreadyDisliked ? <DislikeIcoActive /> : <DislikeIco />}
      </button>
    </form>
  )
}
