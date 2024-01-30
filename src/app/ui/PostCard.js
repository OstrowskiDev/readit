import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import postsData from '@/../mock-data/posts.json'

const PostCard = ({ id }) => {
  const router = useRouter()
  const post = postsData.find((post) => post.id === id)

  if (!post) {
    // Handle case when post is not found
    return <div>Post not found</div>
  }

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h2 className="text-lg font-semibold">{post.title}</h2>
      <p className="text-gray-600 mb-2">
        By{' '}
        <Link href={`/user/${post.user}`}>
          <a className="text-blue-500 hover:underline">{post.user}</a>
        </Link>
      </p>
      <p>{post.content}</p>
      <div className="mt-4 flex justify-end">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => router.push(`/post/${id}`)}
        >
          More
        </button>
      </div>
    </div>
  )
}

export default PostCard
