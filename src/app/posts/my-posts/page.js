import PostsPage from '../page'

export default function MyPostsPage({ searchParams }) {
  return <PostsPage searchParams={searchParams} onlyCurrentUserPosts={'true'} />
}
