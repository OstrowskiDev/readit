'use client'

import { useState, Suspense, lazy } from 'react'
import TimeAgo from './TimeAgo'
import Avatar from '../lib/avatars/Avatar'
import { UserInfoboxLoader } from './loaders/UserInfoboxLoader'
import useMouseHover from '../lib/hooks/useMouseHover'
import { CommentButtons } from './CommentButtons'
import { CommentContextProvider } from '../lib/context/CommentContextProvider'
const LazyUserInfobox = lazy(() => import('./UserInfobox.js'))

export function Comment({
  comment,
  comments,
  setComments,
  commentId,
  depth,
  postId,
  renderChildren,
}) {
  const [deleteOptimistically, setDeleteOptimistically] = useState(false)
  const { isUserHovered, handleMouseEnter, handleMouseLeave } = useMouseHover()
  const [toggleCollapse, setToggleCollapse] = useState(false)
  const rootPostId = postId ? postId : comment.rootPostId

  if (!comment) return null
  const author = comment.authorData

  return (
    <div
      className="comment-container relative flex pt-4 px-2"
      id={commentId}
      style={{
        marginLeft: depth === 0 ? 0 : 25,
        display: deleteOptimistically ? 'none' : 'flex',
      }}
    >
      {/* comment accordion element */}
      <div
        className="comment-collapse-element comment-vertical-line absolute left-[4px] top-14 w-3"
        onClick={() => setToggleCollapse((prevValue) => !prevValue)}
      >
        {toggleCollapse && (
          <div className="comment-collapse-icon absolute flex justify-center items-center w-5 h-5 top-8 left-[-4px] bg-gray-100 border border-gray-400 rounded-full text-gray-400">
            <p className="pb-[2px]">+</p>
          </div>
        )}
      </div>

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
        <CommentContextProvider
          comment={comment}
          commentId={commentId}
          postId={rootPostId}
          setDeleteOptimistically={setDeleteOptimistically}
          comments={comments}
          setComments={setComments}
        >
          <CommentButtons />
        </CommentContextProvider>

        {/* comment replies */}
        {!toggleCollapse && renderChildren && (
          <div className="comment-replies ml-[20px]">
            {comment.replies.map((replyId) => {
              const reply = comments.find((c) => c._id === replyId)
              return (
                <Comment
                  key={replyId}
                  comment={reply}
                  comments={comments}
                  setComments={setComments}
                  commentId={replyId}
                  depth={depth + 1}
                  postId={postId}
                  renderChildren={renderChildren}
                />
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
