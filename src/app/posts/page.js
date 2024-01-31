import React from 'react'
import PostCard from '../ui/PostCard'
import postsData from '@/../mock-data/posts.json'
import PostsSearch from '../ui/PostsSearch'

export default function PostsPage() {
  const posts = postsData.slice(0, 40)
  return (
    <div className="container mx-auto mt-8 px-4">
      <div className="flex justify-between mb-10 xl:items-center flex-col xl:flex-row">
        <h1 className="text-2xl font-semibold w-80">Latest Posts</h1>
        <PostsSearch />
      </div>
      <div className="grid grid-cols-1 2col:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} id={post.id} />
        ))}
      </div>
    </div>
  )
}
