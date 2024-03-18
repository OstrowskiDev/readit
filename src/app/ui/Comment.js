'use client'

import { useState, Suspense, lazy } from 'react'
import { CommentBtnsContextWrapper } from '../lib/context/CommentBtnsContextWrapper'
import TimeAgo from './TimeAgo'
import Avatar from '../lib/avatars/Avatar'
import { SpinnerGray } from './loaders/SpinnerGray'

const LazyUserInfobox = lazy(() => import('./UserInfobox.js'))

// Render comment and its replies recursively
export function Comment({ authors, comments, commentId, depth, postId }) {
  const [deleteOptimistically, setDeleteOptimistically] = useState(false)
  const [isUserHovered, setIsUserHovered] = useState(false)
  // let hoverTimeoutId
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

  function InfoboxLoader() {
    return (
      <div className="infobox-container absolute top-16 left-3 w-[350px] h-[260px] z-40 p-8 flex flex-col justify-center items-center bg-white rounded-3xl drop-shadow-2xl hover:cursor-default">
        <SpinnerGray />
        <h2 className="text-gray-600">Loading...</h2>
      </div>
    )
  }

  return (
    <div
      className="comment-container relative flex pt-4 px-2"
      style={{
        marginLeft: depth * 20,
        display: deleteOptimistically ? 'none' : 'flex',
      }}
    >
      <div className="comment-styling-element comment-vertical-line absolute left-[4px] top-14 w-3"></div>
      <div className="comment-main-content-container w-full">
        <div className="comment-username-container relative right-6 flex items-center">
          <div
            className="comment-avatar min-w-12 min-h-12 hover:cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Avatar
              seed={author?.avatar.seed}
              color={author?.avatar.color}
              size={48}
              border={2}
            />
            <Suspense fallback={<InfoboxLoader />}>
              {isUserHovered && <LazyUserInfobox author={author} />}
            </Suspense>
          </div>
          <p
            className="comment-author ml-2 text-blue-900 text-15 hover:cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {author.name}
          </p>
          <TimeAgo
            createdAt={comment.createdAt}
            updatedAt={comment.updatedAt}
            type="created"
          />
        </div>

        <div className="comment-body-container ml-4">
          <pre className="comment-body mt-1 text-lg font-sans whitespace-pre-wrap">
            {comment.content}
          </pre>
        </div>
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
