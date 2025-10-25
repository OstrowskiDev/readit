'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import { SignInIco } from '../icons/SignInIco'

export function MobileSignIn() {
  const { data: session } = useSession()
  const appUrl = process.env.NEXT_PUBLIC_APP_URL

  async function handleSignIn() {
    signIn()
  }

  async function handleSighOut() {
    await signOut({ callbackUrl: `${appUrl}/goodbye` })
  }

  return (
    <>
      {session ? (
        <div
          onClick={handleSighOut}
          className="mobile-sign-out w-10 h-10 p-[2px] ml-1 mr-3 my-4 hover:cursor-pointer"
        >
          <SignInIco className="text-app-blue btn-color-hover" />
        </div>
      ) : (
        <div
          onClick={handleSignIn}
          className="mobile-sign-in w-10 h-10 p-[2px] ml-1 mr-3 my-4  hover:cursor-pointer"
        >
          <SignInIco className="text-app-blue btn-color-hover" />
        </div>
      )}
    </>
  )
}
