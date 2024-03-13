'use client'

import { useState } from 'react'
import { CommentBtnsContextWrapper } from '../lib/context/CommentBtnsContextWrapper'
import TimeAgo from './TimeAgo'
import { AvatarCali } from '../lib/avatars/collectionLorelei'

// Render comment and its replies recursively
export function Comment({ authors, comments, commentId, depth, postId }) {
  const [deleteOptimistically, setDeleteOptimistically] = useState(false)
  if (!comments) return null
  const comment = comments.find((comment) => comment._id === commentId)

  if (!comment || !authors) return null
  const authorId = comment.user_id
  const author = authors.find((author) => author._id === authorId)
  const commentLikes = comment.likes
  const commentDislikes = comment.dislikes

  return (
    <div
      className="comment-container relative flex pt-4 px-2"
      style={{
        marginLeft: depth * 20,
        display: deleteOptimistically ? 'none' : 'flex',
      }}
    >
      <div className="comment-styling-element comment-vertical-line absolute left-[-6px] top-14 w-3"></div>
      <div className="comment-main-content-container w-full">
        <div className="comment-username-container relative right-6 flex items-center">
          <div className="comment-avatar w-16 h-16 bg-blue-400">
            <AvatarCali />
          </div>
          <p className="comment-author ml-1 text-blue-900 text-15">
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
        <div className="ml-[20px]">
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
