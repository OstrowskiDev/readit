import React from 'react'
import Link from 'next/link'
// import { useRouter } from 'next/router'
import postsData from '@/../mock-data/posts.json'

const PostCard = ({ id }) => {
  // const router = useRouter()

  // below lines of code to test component without fetching to JSON file:
  // const testId = '32538b5f-2a80-4b28-bd27-817e93cfbe57'
  // const post = postsData.find((post) => post.id === testId)
  const post = postsData.find((post) => post.id === id)

  if (!post) {
    // Handle case when post is not found
    return <div>Post not found</div>
  }

  return (
    <div
      className="flex flex-col justify-between flex-grow min-w-[200px] max-w-[600px] h-56 bg-white p-4 rounded-md 
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
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          // onClick={() => router.push(`/post/${id}`)}
        >
          More
        </button>
      </div>
    </div>
  )
}

export default PostCard
