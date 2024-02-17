import { CommentBtnsContextWrapper } from '../lib/context/CommentBtnsContextWrapper'
import { getUser } from '../lib/db'

// Render comment and its replies recursively
export async function Comment({ commentId, depth, postId }) {
  const allComments = await getComments()
  const comment = allComments.find((c) => c._id === commentId)
  if (!comment) return null
  const commentAuthorId = comment.user_id
  const commentAuthor = await getUser(commentAuthorId)

  return (
    <div
      className="comment-container relative flex pt-4 px-2"
      key={comment._id}
      style={{ marginLeft: depth * 20 }}
    >
      <div className="comment-styling-element comment-vertical-line absolute left-[-6px] top-14 w-3"></div>
      <div className="comment-main-content-container w-full">
        <div className="comment-username-container relative right-6 flex items-center">
          <div className="comment-avatar w-8 h-8 bg-blue-400 rounded-md"></div>
          <p className="comment-author ml-1 text-blue-900">{commentAuthor.name}</p>
        </div>
        <div className="comment-body-container ml-4">
          <p className="comment-body mt-1 text-lg">{comment.content}</p>
        </div>
        <CommentBtnsContextWrapper commentId={comment._id} postId={postId} />
        <div className="ml-[20px]">
          {comment.replies.map((replyId) => (
            <Comment commentId={replyId} depth={depth + 1} postId={postId} />
          ))}
        </div>
      </div>
    </div>
  )
}

async function getComments() {
  const res = await fetch('http://localhost:3000/api/comments', { cache: 'no-store' })
  if (!res.ok) return notFound()
  return res.json()
}
