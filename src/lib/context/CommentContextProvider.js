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
        setDeleteOptimistically,
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
