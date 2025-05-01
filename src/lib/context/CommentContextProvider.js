'use client'

import { createContext, useContext } from 'react'

const CommentContext = createContext()

export function CommentContextProvider({
  children,
  comment,
  commentId,
  postId,
  setDeleteOptimistically,
  comments,
  setComments,
  isReplyFormVis,
  setIsReplyFormVis,
  isEditVisible,
  setIsEditVisible,
}) {
  return (
    <CommentContext.Provider
      value={{
        isReplyFormVis,
        setIsReplyFormVis,
        isEditVisible,
        setIsEditVisible,
        comment,
        commentId,
        comments,
        setComments,
        postId,
        setDeleteOptimistically,
      }}
    >
      {children}
    </CommentContext.Provider>
  )
}

export function useCommentContext() {
  return useContext(CommentContext)
}
