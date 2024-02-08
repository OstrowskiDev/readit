import { EditPostBtn } from '@/app/ui/EditPostBtn'
import { getPost, getUser } from '@/app/lib/db'
import Link from 'next/link'

export default async function Page({ params }) {
  const postId = params.id
  //need to sanitize users input form uri params
  //need to add user auth
  const post = await getPost(postId)
  const userId = post['user-id']
  const user = await getUser(userId)
  return (
    <div className="mx-6 mt-8 px-4">
      <div className="flex flex-col justify-between max-w-[680px] p-4 rounded-md shadow-center-sm">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl pt-1 font-semibold">{post.title}</h2>
          <EditPostBtn postId={postId} />
        </div>

        <p className="text-gray-600 mb-4">
          By{' '}
          <Link
            href={`/api/users/user/${post['user-id']}`}
            className="text-blue-500 hover:underline"
          >
            {user.name}
          </Link>
        </p>

        <p className="break-words">{post.content}</p>

        <div className="mt-2 flex justify-end">
          <Link href={`/`} className="btn-blue px-3 py-1 rounded-md">
            Comment
          </Link>
        </div>
      </div>
    </div>
  )
}
