'use client'

import { CommentBtnsContextWrapper } from '../lib/context/CommentBtnsContextWrapper'

// Render comment and its replies recursively
export function Comment({ comments, commentId, depth, postId }) {
  console.log(comments)
  if (!comments) return null
  const comment = comments.find((comment) => comment._id === commentId)
  console.log(comment)
  const authorId = comment.user_id

  // useEffect(() => {
  //   async function fetchData() {
  //     // const commentData = await getComment(commentId)
  //     // setComment(commentData)
  //     // const authorId = commentData.user_id
  //     const authorData = await getUser(authorId)
  //     setCommentAuthor(authorData)
  //   }
  //   fetchData()
  // }, [])

  // const comment = await getComment(commentId)
  if (!comment || !authorId) return null
  // const commentAuthorId = comment.user_id
  // const commentAuthor = await getUser(commentAuthorId)
  // const commentAuthorId = comment.user_id
  const commentAuthorId = comment.user_id
  const commentLikes = comment.likes
  const commentDislikes = comment.dislikes

  return (
    <div className="comment-container relative flex pt-4 px-2" style={{ marginLeft: depth * 20 }}>
      <div className="comment-styling-element comment-vertical-line absolute left-[-6px] top-14 w-3"></div>
      <div className="comment-main-content-container w-full">
        <div className="comment-username-container relative right-6 flex items-center">
          <div className="comment-avatar w-8 h-8 bg-blue-400 rounded-md"></div>
          {/* <p className="comment-author ml-1 text-blue-900">{commentAuthor.name}</p> */}
          <p className="comment-author ml-1 text-blue-900">Chad Faker</p>
        </div>
        <div className="comment-body-container ml-4">
          <pre className="comment-body mt-1 text-lg font-sans whitespace-pre-wrap">
            {comment.content}
          </pre>
        </div>
        <CommentBtnsContextWrapper
          commentId={commentId}
          postId={postId}
          // authorId={commentAuthorId}
          authorId={authorId}
          commentLikes={commentLikes}
          commentDislikes={commentDislikes}
          commentContent={comment.content}
        />
        <div className="ml-[20px]">
          {comment.replies.map((replyId) => (
            <Comment
              key={replyId}
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
