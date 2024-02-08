import { EditPostBtn } from '@/app/ui/EditPostBtn'
import { getPost, getUser } from '@/app/lib/db'
import Link from 'next/link'
import { DeletePostBtn } from '@/app/ui/DeletePostBtn'
import PostAuthor from '@/app/ui/PostAuthor'

export default async function Page({ params }) {
  const postId = params.id
  const post = await getPost(postId)
  const userId = post['user-id']
  const user = await getUser(userId)
  return (
    <div className="w-full mt-8 px-4">
      <div className="post-card-container flex flex-col justify-between max-w-[680px] mx-6  p-4 rounded-md shadow-center-sm">
        <div className="post-header flex justify-between mb-4">
          <h2 className="post-title text-xl pt-1 font-semibold">{post.title}</h2>
          <div className="post-btn-container flex gap-2">
            <EditPostBtn postId={postId} />
            <DeletePostBtn postId={postId} />
          </div>
        </div>
        <PostAuthor postId={post['user-id']} userName={user.name} />
        <p className="post-text break-words">{post.content}</p>
        <div className="post-btn-container comment-btn mt-2 flex justify-end">
          <Link href={`/`} className="btn-blue px-3 py-1 rounded-md">
            Comment
          </Link>
        </div>
      </div>
    </div>
  )
}
