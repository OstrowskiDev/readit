'use client'

import { useCommentContext } from '../lib/context/CommentContextProvider'

export function LikeCount() {
  const { commentLikes, commentDislikes } = useCommentContext()
  const noLikes = commentLikes ? commentLikes?.length : 0
  const noDislikes = commentDislikes ? commentDislikes?.length : 0
  const score = noLikes - noDislikes

  return (
    <>
      {score >= 0 ? (
        <p className="m-0 font-bold text-gray-900">{score}</p>
      ) : (
        <p className="m-0 font-bold text-red-900">{score}</p>
      )}
    </>
  )
}
