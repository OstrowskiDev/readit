import { CommentContextProvider } from './CommentContextProvider'

export function CommentBtnsContextWrapper({
  children,
  comment,
  commentId,
  postId,
  comments,
  setComments,
}) {
  return (
    <CommentContextProvider
      comment={comment}
      commentId={commentId}
      postId={postId}
      comments={comments}
      setComments={setComments}
    >
      {children}
    </CommentContextProvider>
  )
}
