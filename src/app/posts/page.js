import React from 'react'
import PostCard from '../ui/PostCard'
import postsData from '@/../mock-data/posts.json'

const PostsPage = () => {
  const posts = postsData.slice(0, 40) // Fetching first 40 posts

  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-2xl font-semibold mb-4">Latest Posts</h1>
      <div
        className="
          grid 
          grid-cols-1
          2col:grid-cols-2 
          xl:grid-cols-3 
          3xl:grid-cols-4
          gap-6"
      >
        {posts.map((post) => (
          <PostCard key={post.id} id={post.id} />
        ))}
      </div>
    </div>
  )
}

export default PostsPage
