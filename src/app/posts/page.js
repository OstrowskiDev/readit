import PostCard from '../ui/PostCard'
import PostsSearch from '../ui/PostsSearch'
import CreateBtn from '../ui/CreateBtn'
import postsJSON from '@/../mock-data/posts.json'
import sanitizeHtml from 'sanitize-html'

export default async function Page({ searchParams }) {
  const posts = JSON.parse(JSON.stringify(postsJSON))
  const dirtyQuery = searchParams?.query || ''
  const query = sanitizeHtml(dirtyQuery, { allowedTags: null })
  console.log(query)
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
          <PostCard key={post.id} id={post.id} />
        ))}
      </div>
    </div>
  )
}
