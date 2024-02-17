'use client'

import { CommentButtons } from '@/app/ui/CommentButtons'
import { CommentContextProvider } from './CommentContextProvider'

export function CommentBtnsContextWrapper({ commentId, postId }) {
  return (
    <CommentContextProvider commentId={commentId} postId={postId}>
      <CommentButtons commentId={commentId} postId={postId} />
    </CommentContextProvider>
  )
}
