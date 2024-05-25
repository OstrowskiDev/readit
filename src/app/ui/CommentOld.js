'use client'

import { useState, Suspense, lazy, useEffect } from 'react'
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
  enableReplyBtn,
}) {
  const [deleteOptimistically, setDeleteOptimistically] = useState(false)
  const { isUserHovered, handleMouseEnter, handleMouseLeave } = useMouseHover()
  const [toggleCollapse, setToggleCollapse] = useState(false)
  const [isReplyFormVis, setIsReplyFormVis] = useState(false)
  const [isEditVisible, setIsEditVisible] = useState(false)
  const [targetCommentId, setTargetCommentId] = useState(null)
  const rootPostId = postId ? postId : comment.rootPostId

  useEffect(() => {
    const commentElementId = window.location.hash.substring(1)
    setTargetCommentId(commentElementId)
  }, [])

  useEffect(() => {
    if (comment && targetCommentId) {
      const element = document.getElementById(targetCommentId)
      if (element) {
        // navigate to specific comment
        element.scrollIntoView()
      }
      const params = new URLSearchParams(window.location.search)
      const showEditForm = params.get('showEditForm')
      const showReplyForm = params.get('showReplyForm')
      if (showEditForm === 'true' && comment._id === targetCommentId) {
        setIsEditVisible(true)
      }

      if (showReplyForm === 'true' && comment._id === targetCommentId) {
        setIsReplyFormVis(true)
      }
      //delete # fragment identifier form the url, this prevents the page from scrolling to the comment on every users action
      history.replaceState(null, null, ' ')
    }
  }, [comment, targetCommentId])

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
    enableReplyBtn,
    isReplyFormVis,
    setIsReplyFormVis,
    isEditVisible,
    setIsEditVisible,
  }

  return (
    <div className="comment-infobox-wrapper relative w-full">
      {anchorComment ? (
        <a
          href={`/posts/post/${comment.rootPostId}#${comment._id}`}
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
