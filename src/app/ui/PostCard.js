import React from 'react'
import Link from 'next/link'

export default async function PostCard({ _id, title, user_id, content, user_name }) {
  return (
    <div
      className="flex flex-col justify-between flex-grow 
      min-w-[200px] max-w-[600px] h-56 p-4 rounded-md 
      shadow-md hover:shadow-center-md
      transition-all duration-300"
    >
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-gray-600 mb-2">
        {'By '}
        <Link href={`/api/users/user/${user_id}`} className="text-blue-500 hover:underline">
          {user_name}
        </Link>
      </p>
      <p className="max-lines-3">{content}</p>
      <div className="mt-2 flex justify-end">
        <Link href={`/posts/post/${_id}`} className="btn-blue px-4 py-2 rounded-md">
          More
        </Link>
      </div>
    </div>
  )
}
