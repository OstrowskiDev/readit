import { useCommentContext } from '@/lib/context/CommentContextProvider'
import { usePostContext } from '@/lib/context/PostContextProvider'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export function DrawConnections({ contentRef, commentRef }) {
  const [contentHeight, setContentHeight] = useState(0)
  const [commentHeight, setCommentHeight] = useState(0)
  const [formHeight, setFormHeight] = useState(0)
  const { triggerRebuild } = usePostContext()
  const { comment, comments, formRef } = useCommentContext()
  const pathname = usePathname()

  useEffect(() => {
    function updateHeight() {
      if (contentRef.current) {
        setContentHeight(contentRef.current.offsetHeight)
      }
      if (commentRef.current) {
        setCommentHeight(commentRef.current.offsetHeight)
      }
      if (formRef?.current) {
        setFormHeight(formRef?.current?.offsetHeight)
      }
    }
    updateHeight()
    window.addEventListener('resize', updateHeight)
    return () => window.removeEventListener('resize', updateHeight)
  }, [contentRef, commentRef, formRef, triggerRebuild])

  if (!pathname.includes('/posts/post/')) {
    return null
  }
  if (!comment || !comments) {
    return null
  }

  const parentIsComment = comment.parent.type === 'comment'
  const hasChildren = comment.replies.length > 0
  const hasNextSibling = () => {
    if (comment.parent.type === 'comment') {
      const parentComment = comments.find((c) => c._id === comment.parent._id)
      const index = parentComment.replies.findIndex((id) => id === comment._id)
      return index >= 0 && index < parentComment.replies.length - 1
    } else {
      return false
    }
  }

  function LineToParent() {
    return (
      <div className="relative">
        {parentIsComment && (
          <>
            <div className="line-to-parent absolute w-[30px] h-[30px] top-[-6px] left-[-35px] border-2 circle-quarter"></div>
            <div className="line-to-parent absolute w-[2px] h-[30px] top-[-20px] left-[-35px] bg-app-blue-alpha"></div>
          </>
        )}
      </div>
    )
  }

  function LineToChild() {
    return (
      <div className="relative">
        {hasChildren && (
          <>
            <div
              className="line-to-child absolute w-[2px] top-[42px] left-[1px] bg-app-blue-alpha"
              style={{
                height: `${contentHeight + formHeight + 52}px`,
              }}
            ></div>
          </>
        )}
      </div>
    )
  }

  function LineToSibling() {
    return (
      <div className="relative">
        {hasNextSibling() && (
          <>
            <div
              className="line-to-sibling absolute w-[2px] left-[-35px] bg-app-blue-alpha"
              style={{
                height: `${commentHeight + 12}px`,
              }}
            ></div>
          </>
        )}
      </div>
    )
  }

  return (
    <>
      <LineToSibling />
      <LineToChild />
      <LineToParent />
    </>
  )
}
