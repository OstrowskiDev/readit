'use client'

import { CommentButtons } from '@/app/ui/CommentButtons'
import { CommentContextProvider } from './CommentContextProvider'

export function CommentBtnsContextWrapper({
  commentId,
  postId,
  authorId,
  commentLikes,
  commentDislikes,
  commentContent,
  setDeleteOptimistically,
}) {
  return (
    <CommentContextProvider
      commentId={commentId}
      postId={postId}
      authorId={authorId}
      commentLikes={commentLikes}
      commentDislikes={commentDislikes}
      commentContent={commentContent}
      setDeleteOptimistically={setDeleteOptimistically}
    >
      <CommentButtons />
    </CommentContextProvider>
  )
}
