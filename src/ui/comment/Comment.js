'use client'

import { CommentContextProvider } from '@/lib/context/CommentContextProvider'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { CommentAuthorsInfo } from './CommentAuthorsInfo'
import { CommentButtons } from './CommentButtons'
import { DrawConnections } from '../post/DrawConnections'

import customSchema from '@/services/rehype-sanitize/customSchema'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import remarkGfm from 'remark-gfm'

export function Comment({
  comment,
  comments,
  setComments,
  commentId,
  depth,
  postId,
  renderChildren,
}) {
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
  const formRef = useRef()

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
      //!!!! delete # fragment identifier form the url, this prevents the page from scrolling to selected by identifier comment on every users action
      history.replaceState(null, null, ' ')
    }
  }, [comment, targetCommentId])

  if (!comment) return null
  return (
    <CommentContextProvider
      comment={comment}
      commentId={commentId}
      postId={rootPostId}
      comments={comments}
      setComments={setComments}
      isReplyFormVis={isReplyFormVis}
      setIsReplyFormVis={setIsReplyFormVis}
      isEditVisible={isEditVisible}
      setIsEditVisible={setIsEditVisible}
      formRef={formRef}
    >
      <div
        className="comment-container relative pt-4 px-2"
        id={commentId}
        style={{
          marginLeft: depth === 0 ? 0 : 8,
        }}
      >
        {/* comment accordion element */}
        <DrawConnections
          contentRef={contentRef}
          commentRef={commentRef}
          formRef={formRef}
        />

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
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw, [rehypeSanitize, customSchema]]}
              >
                {comment.content}
              </ReactMarkdown>
            </div>

            {/* comment buttons */}
            <CommentButtons style={adjustOutsideTree} formRef={formRef} />
          </div>

          {/* comment replies */}
          {renderChildren && (
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
