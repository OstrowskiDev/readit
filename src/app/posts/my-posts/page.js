'use client'

import PostsPage from '../page'
import { useEffect, useRef } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'

export default function MyPostsPage() {
  const searchParams = useSearchParams()
  const searchParamsObj = Object.fromEntries(searchParams.entries())
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
          searchParams={searchParamsObj}
          disableCreateBtn={true}
          disableFilteringByAuthor={true}
          forceAuthorName={session.user.name}
          pageTitle={'My Posts'}
        />
      )}
    </>
  )
}
