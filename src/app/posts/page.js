import PostCard from '../ui/PostCard'
import PostsSearch from '../ui/PostsSearch'
import CreateBtn from '../ui/CreateBtn'
import sanitizeHtml from 'sanitize-html'
import { notFound } from 'next/navigation'

async function getData() {
  const res = await fetch('http://localhost:3000/api/posts', { cache: 'no-store' })
  if (!res.ok) return notFound()
  return res.json()
}

export default async function Page({ searchParams }) {
  const posts = await getData()
  const dirtyQuery = searchParams?.query || ''
  const query = sanitizeHtml(dirtyQuery, { allowedTags: null })
  const matchingPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.content.toLowerCase().includes(query.toLowerCase())
  )
  return (
    <div className="container mx-auto mt-8 px-4">
      <div className="flex md:items-center flex-col md:flex-row md:h-10 mb-4">
        <h1 className="grow below-md:hidden text-2xl font-semibold mr-4">Posts</h1>
        <PostsSearch />
        <CreateBtn />
      </div>
      <div className="grid grid-cols-1 2col:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 gap-6">
        {matchingPosts.map((post) => (
          <PostCard key={post._id} _id={post._id} />
        ))}
      </div>
    </div>
  )
}
