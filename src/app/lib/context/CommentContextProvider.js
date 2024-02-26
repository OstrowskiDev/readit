import { createContext, useContext, useState } from 'react'

const CommentContext = createContext()

export function CommentContextProvider({
  children,
  commentId,
  postId,
  authorId,
  commentLikes,
  commentContent,
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
        commentId,
        postId,
        authorId,
        commentLikes,
        commentContent,
      }}
    >
      {children}
    </CommentContext.Provider>
  )
}

export function useCommentContext() {
  return useContext(CommentContext)
}
