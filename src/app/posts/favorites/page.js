'use client'

import PostsPage from '@/app/posts/page'
import { signIn, useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

export default function FavoritesPage() {
  const searchParams = useSearchParams()
  const searchParamsObj = Object.fromEntries(searchParams.entries())
  const { data: session } = useSession()
  const signingIn = useRef(false)

  useEffect(() => {
    if (!session) {
      //below code fixes firefox issues with calling signIn() in useEffect
      //https://github.com/nextauthjs/next-auth/issues/9177
      if (signingIn.current) return
      signingIn.current = true
      signIn()
      return
    }
  }, [session])

  return (
    <PostsPage
      searchParams={searchParamsObj}
      pageTitle={'Favorite Posts'}
      showFavorites={true}
      disableCreateBtn={true}
    />
  )
}
