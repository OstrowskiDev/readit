'use client'

import { useState, Suspense, lazy } from 'react'
import { UserInfoboxLoader } from './loaders/UserInfoboxLoader'
import { CommentButtons } from './CommentButtons'
import { CommentContextProvider } from '../lib/context/CommentContextProvider'
import useMouseHover from '../lib/hooks/useMouseHover'
import { CommentAuthorsInfo } from './CommentAuthorsInfo'
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
  // const { isUserHovered, handleMouseEnter, handleMouseLeave } = useMouseHover()
  const [toggleCollapse, setToggleCollapse] = useState(false)
  const rootPostId = postId ? postId : comment.rootPostId

  console.log('Comment component is being rendered!')

  if (!comment) return null

  function CommentBody({
    comment,
    comments,
    setComments,
    commentId,
    depth,
    postId,
    renderChildren,
  }) {
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
          <CommentAuthorsInfo comment={comment} anchorComment={anchorComment} />

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
          <CommentBody
            comment={comment}
            comments={comments}
            setComments={setComments}
            commentId={commentId}
            depth={depth}
            postId={postId}
            renderChildren={renderChildren}
          />
        </a>
      ) : (
        <CommentBody
          comment={comment}
          comments={comments}
          setComments={setComments}
          commentId={commentId}
          depth={depth}
          postId={postId}
          renderChildren={renderChildren}
        />
      )}

      {/* user infobox on hover */}
      {/* {anchorComment && (
        <Suspense fallback={<UserInfoboxLoader />}>
          {isUserHovered && (
            <LazyUserInfobox
              author={comment.authorData}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
            />
          )}
        </Suspense>
      )} */}
    </div>
  )
}
