'use client'

import { useState, Suspense, lazy } from 'react'
import { UserInfoboxLoader } from './loaders/UserInfoboxLoader'
import useMouseHover from '../lib/hooks/useMouseHover'
import { CommentBody } from './CommentBody'
const LazyUserInfobox = lazy(() => import('./UserInfobox.js'))

export function Comment({
  comment,
  comments,
  setComments,
  commentId,
  depth,
  postId,
  renderChildren,
  anchorComment,
}) {
  const [deleteOptimistically, setDeleteOptimistically] = useState(false)
  const { isUserHovered, handleMouseEnter, handleMouseLeave } = useMouseHover()
  const [toggleCollapse, setToggleCollapse] = useState(false)
  const rootPostId = postId ? postId : comment.rootPostId

  if (!comment) return null
  const commentBodyProps = {
    comment,
    comments,
    setComments,
    commentId,
    depth,
    postId,
    renderChildren,
    deleteOptimistically,
    setDeleteOptimistically,
    anchorComment,
    rootPostId,
    setToggleCollapse,
    toggleCollapse,
    handleMouseEnter,
    handleMouseLeave,
  }

  return (
    <div className="comment-infobox-wrapper relative w-full">
      {anchorComment ? (
        <a
          href={`/posts/post/${comment.rootPostId}`}
          className="comment-anchor-container flex flex-col justify-between
        pb-4 px-4 my-2 rounded-md shadow-center-sm 
        border-white border-2 hover:border-blue-300
        hover:shadow-center-lg hover:cursor-pointer hover:outline-red-50"
        >
          <CommentBody {...commentBodyProps} />
        </a>
      ) : (
        <CommentBody {...commentBodyProps} />
      )}

      {/* user infobox on hover */}
      <Suspense fallback={<UserInfoboxLoader />}>
        {isUserHovered && (
          <LazyUserInfobox
            author={comment.authorData}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
          />
        )}
      </Suspense>
    </div>
  )
}
