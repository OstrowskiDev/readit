import { useEffect, useState } from 'react'
import { useCommentContext } from '../lib/context/CommentContextProvider'

export function DrawConnections({ parentRef }) {
  const [parentHeight, setParentHeight] = useState(0)
  const { comment, comments } = useCommentContext()

  useEffect(() => {
    if (parentRef.current) {
      setParentHeight(parentRef.current.offsetHeight)
    }
  }, [parentRef])

  if (!comment || !comments) {
    return null
  }

  const parentIsComment = comment.parent.type === 'comment'
  const hasChildren = comment.replies.length > 0
  const hasNextSibling = () => {
    const parentComment = comments.find((c) => c._id === comment.parent._id)
    const index = parentComment.replies.findIndex((id) => id === comment._id)
    return index >= 0 && index < parentComment.replies.length - 1
  }

  return (
    <>
      <p>{parentHeight}</p>
    </>
  )
}
