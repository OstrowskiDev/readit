import React from 'react'
import Link from 'next/link'
import { getPost, getUser } from '../lib/db'

export default async function PostCard({ _id }) {
  const post = await getPost(_id)
  const userId = post['user-id']
  const user = await getUser(userId)

  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <div
      className="flex flex-col justify-between flex-grow 
      min-w-[200px] max-w-[600px] h-56 p-4 rounded-md 
      shadow-md hover:shadow-center-md
      transition-all duration-300"
    >
      <h2 className="text-lg font-semibold">{post.title}</h2>
      <p className="text-gray-600 mb-2">
        {'By '}
        <Link href={`/api/users/user/${post['user-id']}`} className="text-blue-500 hover:underline">
          {user.name}
        </Link>
      </p>
      <p className="max-lines-3">{post.content}</p>
      <div className="mt-2 flex justify-end">
        <Link href={`/posts/post/${post._id}`} className="btn-blue px-4 py-2 rounded-md">
          More
        </Link>
      </div>
    </div>
  )
}
