import { getPost, getUser } from '@/app/lib/db'
import PostAuthor from '@/app/ui/PostAuthor'
import { EditPostBtn } from '@/app/ui/buttons/EditPostBtn'
import { DeletePostBtn } from '@/app/ui/buttons/DeletePostBtn'
import { Comment } from '@/app/ui/Comment'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import { PostFooter } from '@/app/ui/PostFooter'
import { countComments } from '@/app/lib/actions'
import { PostOptionsBtn } from '@/app/ui/buttons/PostOptionsBtn'

export default async function PostPage({ params }) {
  const session = await getServerSession(authOptions)
  const postId = params.id
  const post = await getPost(postId)
  const postLikes = post?.likes
  const postDislikes = post?.dislikes

  const userId = post['user-id']
  const user = await getUser(userId)

  const sessionUserId = session?.user.id
  const isPostAuthor = userId === sessionUserId

  const commentNo = await countComments(postId)

  return (
    <div className="w-full flex justify-center my-8 px-4">
      <div className="post-card-container flex flex-col justify-between max-w-[800px] w-full p-4 mx-2 rounded-md shadow-center-sm">
        {/* Post header */}
        <div className="post-header flex justify-between mb-4">
          <h2 className="post-title text-xl pt-1 font-semibold">{post.title}</h2>
          <div className="post-top-btns flex gap-2">
            {isPostAuthor && <EditPostBtn postId={postId} />}
            {isPostAuthor && <DeletePostBtn postId={postId} />}
            <PostOptionsBtn postId={postId} />
          </div>
        </div>

        {/* Post body */}
        <PostAuthor className="post-body-author" userId={post['user-id']} userName={user.name} />
        <pre className="post-body-text font-sans whitespace-pre-wrap">{post.content}</pre>

        {/* Post footer */}
        <PostFooter
          postId={postId}
          commentNo={commentNo}
          postLikes={postLikes}
          postDislikes={postDislikes}
        />

        {/* Comments section */}
        {post.comments && (
          <div className="comments-container">
            <h3 className="comments-header text-lg pt-1 font-semibold">Comments:</h3>
            <div className="comments-list bg-gray-100 pl-8 pr-3 pb-6 mt-1 rounded-md">
              {post.comments?.map((commentId) => (
                <Comment commentId={commentId} depth={0} postId={postId} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
