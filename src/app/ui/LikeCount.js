'use client'

import { useCommentContext } from '../lib/context/CommentContextProvider'

export function LikeCount() {
  const { commentLikes } = useCommentContext()

  const noLikes = commentLikes ? commentLikes?.length : 0
  return <p className="mx-1 font-bold text-gray-900">{noLikes}</p>
}
