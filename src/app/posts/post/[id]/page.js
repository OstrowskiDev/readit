import { getPost, getUser } from '@/app/lib/db'
import PostAuthor from '@/app/ui/PostAuthor'
import { EditPostBtn } from '@/app/ui/buttons/EditPostBtn'
import { DeletePostBtn } from '@/app/ui/buttons/DeletePostBtn'
import { LikeBtn } from '@/app/ui/buttons/LikeBtn'
import { DislikeBtn } from '@/app/ui/buttons/DislikeBtn'
import { ReplyBtn } from '@/app/ui/buttons/ReplyBtn'
import { ShareCommentBtn } from '@/app/ui/buttons/ShareCommentBtn'
import { LikeCount } from '@/app/ui/LikeCount'
import { CommentPostBtn } from '@/app/ui/buttons/CommentPostBtn'
import { SharePostBtn } from '@/app/ui/buttons/SharePostBtn'
import { CommentsCount } from '@/app/ui/CommentsCount'
import { OptionsBtn } from '@/app/ui/buttons/OptionsBtn'
import comments_new from '@/../../mock-data/comments_new'

export default async function Page({ params }) {
  const postId = params.id
  const post = await getPost(postId)
  const userId = post['user-id']
  const user = await getUser(userId)

  const topCommentIDs = [
    'c13a619f-4a38-4b6c-bd0b-9a21d5c40571',
    '30e3a0e5-4f5d-442b-88dc-7f9993c70ac7',
    '5e19f5b2-2c27-4b7b-a2a2-7ed7e00be64b',
  ]

  const allComments = comments_new

  // Render comment and its replies recursively
  function renderComments(commentId, allComments, depth = 0) {
    const comment = allComments.find((c) => c._id === commentId)

    if (!comment) {
      return null
    }

    return (
      <div
        className="comment-container relative flex pt-4 px-2"
        key={comment._id}
        style={{ marginLeft: depth * 20 }}
      >
        <div className="comment-styling-element comment-vertical-line absolute left-[-6px] top-14 w-3"></div>
        <div className="comment-main-content-container">
          <div className="comment-username-container relative right-6 flex items-center">
            <div className="comment-avatar w-8 h-8 bg-blue-400 rounded-md"></div>
            <p className="comment-username ml-1 text-blue-900">{comment.user_id}</p>
          </div>
          <div className="comment-body-container ml-4">
            <p className="comment-body mt-1 text-lg">{comment.content}</p>
          </div>
          <div className="comment-btns-container flex items-center ml-4">
            <LikeBtn className="comment-btn-like" />
            <LikeCount className="comment-likes-num" />
            <DislikeBtn className="comment-btn-dislike" />
            <ReplyBtn className="comment-btn-reply" />
            <ShareCommentBtn className="comment-btn-share" />
          </div>
          <div className="ml-[20px]">
            {comment.replies.map((replyId) => renderComments(replyId, allComments, depth + 1))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full flex justify-center my-8 px-4">
      <div className="post-card-container flex flex-col justify-between max-w-[800px] p-4 rounded-md shadow-center-sm">
        {/* Post header */}
        <div className="post-header flex justify-between mb-4">
          <h2 className="post-title text-xl pt-1 font-semibold">{post.title}</h2>
          <div className="post-top-btns flex gap-2">
            <EditPostBtn postId={postId} />
            <DeletePostBtn postId={postId} />
          </div>
        </div>

        {/* Post body */}
        <PostAuthor className="post-body-author" postId={post['user-id']} userName={user.name} />
        <p className="post-body-text break-words">{post.content}</p>

        {/* Post bottom buttons */}
        <div className="post-bottom-btns-container flex justify-between items-center p-2">
          <div className="post-bottom-btns-left flex items-center gap-3">
            <CommentsCount />
            <SharePostBtn />
            <OptionsBtn />
          </div>
          <div className="post-bottom-btns-right comment-btn mt-2 flex justify-end">
            <CommentPostBtn />
          </div>
        </div>

        {/* Comments section */}
        <h3 className="comments-section-title text-lg pt-1 font-semibold">Comments:</h3>
        <div className="comments-section bg-gray-100 pl-8 pr-3 pb-6 mt-1 rounded-md">
          {topCommentIDs.map((commentId) => renderComments(commentId, allComments))}
        </div>
      </div>
    </div>
  )
}
