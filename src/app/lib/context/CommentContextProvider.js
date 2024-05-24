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
}) {
  const [isVisible, setIsVisible] = useState(false)
  const [isEditVisible, setIsEditVisible] = useState(false)

  return (
    <CommentContext.Provider
      value={{
        isVisible,
        setIsVisible,
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
