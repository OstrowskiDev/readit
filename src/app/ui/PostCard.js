import React from 'react'
import Link from 'next/link'
import PostAuthor from './PostAuthor'

export default async function PostCard({ _id, title, user_id, content, user_name }) {
  return (
    <div
      className="card-container flex flex-col justify-between flex-grow 
      min-w-[200px] max-w-[600px] h-56 p-4 rounded-md 
      shadow-md hover:shadow-center-md
      transition-all duration-300"
    >
      <h2 className="card-title text-lg font-semibold">{title}</h2>
      <PostAuthor postId={user_id} userName={user_name} />
      <p className="card-text max-lines-3">{content}</p>
      <div className="card-btn-container mt-2 flex justify-end">
        {/* <Link href={`/posts/post/${_id}`} className="btn-blue px-4 py-2 rounded-md">
          More
        </Link> */}
        <a href={`/posts/post/${_id}`} className="btn-blue px-4 py-2 rounded-md">
          More
        </a>
      </div>
    </div>
  )
}
