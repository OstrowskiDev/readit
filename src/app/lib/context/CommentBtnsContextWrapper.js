'use client'

import { CommentButtons } from '@/app/ui/CommentButtons'
import { CommentContextProvider } from './CommentContextProvider'

export function CommentBtnsContextWrapper({ commentId, postId, authorId, commentContent }) {
  return (
    <CommentContextProvider
      commentId={commentId}
      postId={postId}
      authorId={authorId}
      commentContent={commentContent}
    >
      <CommentButtons />
    </CommentContextProvider>
  )
}
