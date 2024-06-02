import PostsPage from '../page'

export default function MyPostsPage({ searchParams }) {
  return (
    <PostsPage
      searchParams={searchParams}
      disableCreateBtn={true}
      disableFilteringByAuthor={true}
      onlyCurrentUserPosts={'true'}
      pageTitle={'My Posts'}
    />
  )
}
