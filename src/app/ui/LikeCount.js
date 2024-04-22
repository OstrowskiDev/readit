'use client'

import { useCommentContext } from '../lib/context/CommentContextProvider'

export function LikeCount() {
  const { comment } = useCommentContext()
  const numOfLikes = comment.likes ? comment.likes.length : 0
  const numOfDislikes = comment.dislikes ? comment.dislikes.length : 0
  const popularity = numOfLikes - numOfDislikes

  return (
    <>
      {popularity >= 0 ? (
        <p className="m-0 font-bold text-gray-900">{popularity}</p>
      ) : (
        <p className="m-0 font-bold text-red-900">{popularity}</p>
      )}
    </>
  )
}
