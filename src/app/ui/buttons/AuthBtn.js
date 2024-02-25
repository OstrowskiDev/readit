'use client'

import { signIn, signOut, useSession } from 'next-auth/react'

export function AuthBtn() {
  const { data: session } = useSession()

  async function handleSignIn() {
    signIn()
  }

  async function handleSighOut() {
    await signOut({ redirect: false })
  }

  return (
    <div className="md:mt-2 min-w-24 md:w-full">
      {session ? (
        <button onClick={handleSighOut} className="nav-button py-4">
          Sign out
        </button>
      ) : (
        <button onClick={handleSignIn} className="nav-button py-4">
          Sign in
        </button>
      )}
    </div>
  )
}
