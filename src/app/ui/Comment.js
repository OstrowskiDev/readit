'use client'

import { useState, Suspense, lazy } from 'react'
import { CommentBtnsContextWrapper } from '../lib/context/CommentBtnsContextWrapper'
import TimeAgo from './TimeAgo'
import Avatar from '../lib/avatars/Avatar'
import { UserInfoboxLoader } from './loaders/UserInfoboxLoader'
const LazyUserInfobox = lazy(() => import('./UserInfobox.js'))

export function Comment({ authors, comments, commentId, depth, postId }) {
  const [deleteOptimistically, setDeleteOptimistically] = useState(false)
  const [isUserHovered, setIsUserHovered] = useState(false)
  let onHoverTimeout
  let onHoverOutTimeout

  if (!comments) return null
  const comment = comments.find((comment) => comment._id === commentId)

  if (!comment || !authors) return null
  const authorId = comment.user_id
  const author = authors.find((author) => author._id === authorId)
  const commentLikes = comment.likes
  const commentDislikes = comment.dislikes

  function handleMouseEnter() {
    onHoverOutTimeout = setTimeout(() => {
      setIsUserHovered(true)
    }, 400)
    clearTimeout(onHoverTimeout)
  }

  function handleMouseLeave() {
    clearTimeout(onHoverOutTimeout)
    onHoverTimeout = setTimeout(() => {
      setIsUserHovered(false)
    }, 400)
  }

  return (
    <div
      className="comment-container relative flex pt-4 px-2"
      id={commentId}
      style={{
        marginLeft: depth === 0 ? 0 : 25,
        display: deleteOptimistically ? 'none' : 'flex',
      }}
    >
      <div className="comment-styling-element comment-vertical-line absolute left-[4px] top-14 w-3"></div>
      <div className="comment-main-content-container w-full">
        {/* authors avatar, user name, comment time, edit time */}
        <div className="comment-username-container relative right-6 flex items-center">
          {/* authors avatar */}
          <div
            className="comment-avatar-container min-w-12 min-h-12 hover:cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Avatar
              seed={author?.avatar.seed}
              color={author?.avatar.color}
              size={48}
              border={2}
            />

            {/* user infobox on hover */}
            <Suspense fallback={<UserInfoboxLoader />}>
              {isUserHovered && <LazyUserInfobox author={author} />}
            </Suspense>
          </div>

          {/* authors name */}
          <p
            className="comment-author ml-2 text-blue-900 text-15 hover:cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {author.name}
          </p>

          {/* comment time, edit time */}
          <TimeAgo
            createdAt={comment.createdAt}
            updatedAt={comment.updatedAt}
            type="created"
          />
        </div>

        {/* comment content */}
        <div className="comment-body-container ml-4">
          <pre className="comment-body mt-1 text-lg font-sans whitespace-pre-wrap">
            {comment.content}
          </pre>
        </div>

        {/* comment buttons */}
        <CommentBtnsContextWrapper
          commentId={commentId}
          postId={postId}
          authorId={authorId}
          commentLikes={commentLikes}
          commentDislikes={commentDislikes}
          commentContent={comment.content}
          setDeleteOptimistically={setDeleteOptimistically}
        />
        <div className="comment-replies ml-[20px]">
          {comment.replies.map((replyId) => (
            <Comment
              key={replyId}
              authors={authors}
              comments={comments}
              commentId={replyId}
              depth={depth + 1}
              postId={postId}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
