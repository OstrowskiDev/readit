'use client'

import { useCommentContext } from '../lib/context/CommentContextProvider'

export function LikeCount() {
  const { comment } = useCommentContext()
  const popularity = comment.popularity

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
