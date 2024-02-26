'use client'

import { CommentButtons } from '@/app/ui/CommentButtons'
import { CommentContextProvider } from './CommentContextProvider'

export function CommentBtnsContextWrapper({
  commentId,
  postId,
  authorId,
  commentLikes,
  commentContent,
}) {
  return (
    <CommentContextProvider
      commentId={commentId}
      postId={postId}
      authorId={authorId}
      commentLikes={commentLikes}
      commentContent={commentContent}
    >
      <CommentButtons />
    </CommentContextProvider>
  )
}
