import { createContext, useContext } from 'react'

const CommentContext = createContext()

export function CommentContextProvider({
  children,
  comment,
  commentId,
  postId,
  comments,
  setComments,
  isReplyFormVis,
  setIsReplyFormVis,
  isEditVisible,
  setIsEditVisible,
  formRef,
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
        formRef,
      }}
    >
      {children}
    </CommentContext.Provider>
  )
}

export function useCommentContext() {
  return useContext(CommentContext)
}
