import PostsPage from '../page'

export default function MyPostsPage({ searchParams }) {
  return (
    <PostsPage
      searchParams={searchParams}
      disableCreateBtn={false}
      onlyCurrentUserPosts={'true'}
      pageTitle={'My Posts'}
    />
  )
}
