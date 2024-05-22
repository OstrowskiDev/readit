'use client'

import { CommentContextProvider } from './CommentContextProvider'

export function CommentBtnsContextWrapper({
  children,
  comment,
  commentId,
  postId,
  setDeleteOptimistically,
  comments,
  setComments,
}) {
  return (
    <CommentContextProvider
      comment={comment}
      commentId={commentId}
      postId={postId}
      setDeleteOptimistically={setDeleteOptimistically}
      comments={comments}
      setComments={setComments}
    >
      {children}
    </CommentContextProvider>
  )
}
