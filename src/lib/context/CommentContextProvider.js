import { createContext, useContext, useRef } from 'react'

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
}) {
  const formRef = useRef()
  const editFormRef = useRef()

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
        editFormRef,
      }}
    >
      {children}
    </CommentContext.Provider>
  )
}

export function useCommentContext() {
  return useContext(CommentContext)
}
