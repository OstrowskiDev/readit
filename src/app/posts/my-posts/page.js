'use client'

import { useEffect, useRef } from 'react'
import PostsPage from '../page'
import { signIn, useSession } from 'next-auth/react'

export default function MyPostsPage({ searchParams }) {
  const { data: session } = useSession()
  const signingIn = useRef(false)

  useEffect(() => {
    if (!session) {
      //below code to fix firefox issues with calling signIn() in useEffect
      //reference to github next-auth issue 9177:
      //https://github.com/nextauthjs/next-auth/issues/9177
      if (signingIn.current) return
      signingIn.current = true
      signIn()
      return
    }
  }, [session])
  return (
    <>
      {session && (
        <PostsPage
          searchParams={searchParams}
          disableCreateBtn={true}
          disableFilteringByAuthor={true}
          onlyCurrentUserPosts={'true'}
          pageTitle={'My Posts'}
        />
      )}
    </>
  )
}
