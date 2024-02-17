import { getPost, getUser } from '@/app/lib/db'
import PostAuthor from '@/app/ui/PostAuthor'
import { EditPostBtn } from '@/app/ui/buttons/EditPostBtn'
import { DeletePostBtn } from '@/app/ui/buttons/DeletePostBtn'
import { CommentPostBtn } from '@/app/ui/buttons/CommentPostBtn'
import { SharePostBtn } from '@/app/ui/buttons/SharePostBtn'
import { CommentsCount } from '@/app/ui/CommentsCount'
import { PostOptionsBtn } from '@/app/ui/buttons/PostOptionsBtn'
import { Comment } from '@/app/ui/Comment'

export default async function Page({ params }) {
  const postId = params.id
  const post = await getPost(postId)

  const userId = post['user-id']
  const user = await getUser(userId)

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
            <PostOptionsBtn />
          </div>
          <div className="post-bottom-btns-right comment-btn mt-2 flex justify-end">
            <CommentPostBtn />
          </div>
        </div>

        {/* Comments section */}
        {/* add conditional rendering, this should not render when no comments were created  */}
        <h3 className="comments-section-title text-lg pt-1 font-semibold">Comments:</h3>
        <div className="comments-section bg-gray-100 pl-8 pr-3 pb-6 mt-1 rounded-md">
          {post.comments?.map((commentId) => (
            <Comment commentId={commentId} depth={0} postId={postId} />
          ))}
        </div>
      </div>
    </div>
  )
}
