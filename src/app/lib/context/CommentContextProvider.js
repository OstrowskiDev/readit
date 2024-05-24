'use client'

import { createContext, useContext, useState } from 'react'

const CommentContext = createContext()

export function CommentContextProvider({
  children,
  comment,
  commentId,
  postId,
  setDeleteOptimistically,
  comments,
  setComments,
  enableReplyBtn,
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
        enableReplyBtn,
      }}
    >
      {children}
    </CommentContext.Provider>
  )
}

export function useCommentContext() {
  return useContext(CommentContext)
}
