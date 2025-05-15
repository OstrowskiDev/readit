'use client'

import { useCommentContext } from '@/lib/context/CommentContextProvider'

export function LikeCount() {
  const { comment } = useCommentContext()
  const numOfLikes = comment.likes ? comment.likes.length : 0
  const numOfDislikes = comment.dislikes ? comment.dislikes.length : 0
  const popularity = numOfLikes - numOfDislikes

  return (
    <>
      {popularity >= 0 ? (
        <p className="comment-like-count font-orbitron-bold m-0">
          {popularity}
        </p>
      ) : (
        <p className="comment-like-count font-orbitron-bold m-0 text-red-900">
          {popularity}
        </p>
      )}
    </>
  )
}
