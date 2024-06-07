'use client'

import { useState, useEffect, useRef } from 'react'
import { CommentButtons } from './CommentButtons'
import { CommentContextProvider } from '../lib/context/CommentContextProvider'
import { CommentAuthorsInfo } from './CommentAuthorsInfo'
import { DrawConnections } from './DrawConnections'
import { usePathname } from 'next/navigation'

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
  const [toggleCollapse, setToggleCollapse] = useState(false)
  const [isReplyFormVis, setIsReplyFormVis] = useState(false)
  const [isEditVisible, setIsEditVisible] = useState(false)
  const [targetCommentId, setTargetCommentId] = useState(null)
  const rootPostId = postId ? postId : comment.rootPostId
  const pathname = usePathname()
  const isRenderedAsTree = pathname.includes('/posts/post/')
  const adjustOutsideTree = !isRenderedAsTree
    ? { position: 'relative', left: '-30px' }
    : null

  const contentRef = useRef()
  const commentRef = useRef()

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
      //delete # fragment identifier form the url, this prevents the page from scrolling to selected by identifier comment on every users action
      history.replaceState(null, null, ' ')
    }
  }, [comment, targetCommentId])

  if (!comment) return null
  return (
    <CommentContextProvider
      comment={comment}
      commentId={commentId}
      postId={rootPostId}
      setDeleteOptimistically={setDeleteOptimistically}
      comments={comments}
      setComments={setComments}
      isReplyFormVis={isReplyFormVis}
      setIsReplyFormVis={setIsReplyFormVis}
      isEditVisible={isEditVisible}
      setIsEditVisible={setIsEditVisible}
    >
      <div
        className="comment-container relative pt-4 px-2"
        id={commentId}
        style={{
          marginLeft: depth === 0 ? 0 : 8,

          display: deleteOptimistically ? 'none' : 'block',
        }}
      >
        {/* comment accordion element */}
        <DrawConnections contentRef={contentRef} commentRef={commentRef} />

        {/* !!!! update collapse element to work with DrawConnections component */}
        {/* <div
          className="comment-collapse-element comment-vertical-line absolute left-[4px] top-14 w-3"
          onClick={() => setToggleCollapse((prevValue) => !prevValue)}
        >
          {toggleCollapse && (
            <div className="comment-collapse-icon absolute flex justify-center items-center w-5 h-5 top-8 left-[-4px] bg-gray-100 border border-gray-400 rounded-full text-gray-400">
              <p className="pb-[2px]">+</p>
            </div>
          )}
        </div> */}

        <div ref={commentRef} className="comment-main-content-container">
          {/* authors avatar, user name, comment time, edit time */}
          <CommentAuthorsInfo comment={comment} />

          <div
            className="adjust-position-when-outside-tree-structure"
            style={adjustOutsideTree}
          >
            {/* comment content */}
            <div
              ref={contentRef}
              className="comment-body-container ml-4"
              //adjust width of this element when its being deeply nested inside comments tree so it uses available space more efficiently
              style={
                isRenderedAsTree
                  ? { width: `calc(100% + ${depth * 4}px) - 10px` }
                  : { width: `calc(100% + 22px)` }
              }
            >
              <pre className="comment-body mt-1 font-sans whitespace-pre-wrap">
                {comment.content}
              </pre>
            </div>

            {/* comment buttons */}
            <CommentButtons style={adjustOutsideTree} />
          </div>

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
    </CommentContextProvider>
  )
}
