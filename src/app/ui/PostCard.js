import React from 'react'
import Link from 'next/link'
import postsData from '@/../mock-data/posts.json'

const PostCard = ({ id }) => {
  const post = postsData.find((post) => post.id === id)

  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <div
      className="flex flex-col justify-between flex-grow 
      min-w-[200px] max-w-[600px] h-56 p-4 rounded-md 
      shadow-md hover:shadow-[1px_1px_15px_1px_rgba(0,0,0,0.3)]
      transition-all duration-300"
    >
      <h2 className="text-lg font-semibold">{post.title}</h2>
      <p className="text-gray-600 mb-2">
        By{' '}
        <Link href={`/user/${post.user}`} className="text-blue-500 hover:underline">
          {post.user}
        </Link>
      </p>
      <p className="max-lines-3">{post.content}</p>
      <div className="mt-2 flex justify-end">
        <button className="btn-blue px-4 py-2 rounded-md">More</button>
      </div>
    </div>
  )
}

export default PostCard
