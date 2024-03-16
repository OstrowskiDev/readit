'use client'

import { useState } from 'react'
import { CommentBtnsContextWrapper } from '../lib/context/CommentBtnsContextWrapper'
import TimeAgo from './TimeAgo'
import Avatar from '../lib/avatars/Avatar'

// Render comment and its replies recursively
export function Comment({ authors, comments, commentId, depth, postId }) {
  const [deleteOptimistically, setDeleteOptimistically] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  if (!comments) return null
  const comment = comments.find((comment) => comment._id === commentId)

  if (!comment || !authors) return null
  const authorId = comment.user_id
  const author = authors.find((author) => author._id === authorId)
  const commentLikes = comment.likes
  const commentDislikes = comment.dislikes

  function handleMouseEnter() {
    setIsHovered(true)
  }

  function handleMouseLeave() {
    setIsHovered(false)
  }

  function UserInfobox() {
    return (
      <div className="absolute top-[52px] left-2 w-80 h-64 z-40 bg-blue-200 rounded-xl">
        <p>User Infobox</p>
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
        <div
          className="comment-username-container relative right-6 pb-1 flex items-center hover:cursor-pointer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {isHovered && <UserInfobox />}
          <div className="comment-avatar min-w-12 min-h-12 ">
            <Avatar
              seed={author?.avatar.seed}
              color={author?.avatar.color}
              bgColor={author?.avatar.bgColor}
              borderColor={author?.avatar.borderColor}
            />
          </div>
          <p className="comment-author ml-2 text-blue-900 text-15">
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
