'use client'

import { signIn, signOut, useSession } from 'next-auth/react'

export function AuthBtn() {
  const { data: session } = useSession()
  const appUrl = process.env.NEXT_PUBLIC_APP_URL

  async function handleSignIn() {
    signIn()
  }

  async function handleSighOut() {
    await signOut({ callbackUrl: `${appUrl}/goodbye` })
  }

  return (
    <div className="mt-2 min-w-24 w-full">
      {session ? (
        <button
          onClick={handleSighOut}
          className="nav-button sign-out-button glass-blue-soft interactive-orange-soft btn-color-hover py-4"
        >
          Sign out
        </button>
      ) : (
        <button
          onClick={handleSignIn}
          className="nav-button sign-in-button glass-blue-soft interactive-orange-soft btn-color-hover py-4"
        >
          Sign in
        </button>
      )}
    </div>
  )
}
