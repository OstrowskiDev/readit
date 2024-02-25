'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
// import { getServerSession } from 'next-auth/next'
// import { options } from '@/app/api/auth/[...nextauth]/options'

export function AuthBtn() {
  // const session = await getServerSession(options)
  const { data: session } = useSession()

  async function handleSignIn() {
    signIn()
  }

  async function handleSighOut() {
    await signOut({ redirect: false })
  }

  return (
    <div className="md:mt-2 md:w-full">
      {/* {session ? (
        <button className="nav-button py-4">Sign out</button>
      ) : (
        <button className="nav-button py-4">Sign in</button>
      )} */}
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
