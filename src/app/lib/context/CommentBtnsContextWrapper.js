'use client'

import { CommentButtons } from '@/app/ui/CommentButtons'
import { CommentContextProvider } from './CommentContextProvider'

export function CommentBtnsContextWrapper({ commentId, postId, commentContent }) {
  return (
    <CommentContextProvider commentId={commentId} postId={postId} commentContent={commentContent}>
      <CommentButtons />
    </CommentContextProvider>
  )
}
