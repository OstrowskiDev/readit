'use client'

import { CommentButtons } from '@/app/ui/CommentButtons'
import { CommentContextProvider } from './CommentContextProvider'

export function CommentBtnsContextWrapper({
  comment,
  commentId,
  postId,
  setDeleteOptimistically,
}) {
  return (
    <CommentContextProvider
      comment={comment}
      commentId={commentId}
      postId={postId}
      setDeleteOptimistically={setDeleteOptimistically}
    >
      <CommentButtons />
    </CommentContextProvider>
  )
}
