'use client'

import PostsPage from '@/app/posts/page'

export default function UserPosts({ params, searchParams }) {
  const displayedPostsAuthor = params.id

  console.log(params)
  return (
    <>
      <PostsPage
        searchParams={searchParams}
        onlyCurrentUserPosts={false}
        displayedPostsAuthor={displayedPostsAuthor}
      />
    </>
  )
}
