'use client'

import { handleLikeClick } from '@/app/lib/actions'
import { LikeIco } from '../icons/LikeIco'
import { LikeIcoActive } from '../icons/LikeIcoActive'
import { useSession } from 'next-auth/react'

export function LikePostBtn({ postId, postLikes }) {
  const { data: session } = useSession()
  const userId = session?.user?.id
  const isAlreadyLiked = postLikes?.includes(userId)
  const collection = 'posts'

  const handleLikeWithId = handleLikeClick.bind(null, postId, postId, collection)

  return (
    <form action={handleLikeWithId} className="rounded-md hover:bg-gray-300">
      <button className="w-11 h-10 px-[10px] flex justify-center items-center">
        {isAlreadyLiked ? <LikeIcoActive /> : <LikeIco />}
      </button>
    </form>
  )
}
