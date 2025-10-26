'use client'

import { signIn, useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ErrorTriangleIco } from '@/ui/icons/ErrorTriangleIco'
import { validateSignIn } from '@/lib/security/validateSignIn'
import { AlreadySignedIn } from '@/ui/layout/AlreadySignedIn'
import SimpleCardWrapper from '@/ui/layout/SimpleCardWrapper'
import SimpleCardSubmitBtn from '@/ui/layout/SimpleCardSubmitBtn'

export default function SignInForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const [callbackUrl, setCallbackUrl] = useState(null)
  const { data: session } = useSession()

  const errorMessage = getErrorMessage(error)

  function getErrorMessage(error) {
    if (!error) return null
    if (error === 'CredentialsSignin') {
      return 'Invalid email or password. Please try again.'
    } else if (error === 'AccountInactive') {
      return 'Your account needs to be activated, check your inbox for activation email.'
    } else if (error === 'AccountBlocked') {
      return 'Your account was blocked due to too many failed login attempts. Reset password to regain access.'
    } else {
      return 'An error occurred. Please try again.'
    }
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const encodedUrl = params.get('callbackUrl')
    let decodedUrl
    try {
      decodedUrl = decodeURIComponent(encodedUrl)
    } catch (error) {
      decodedUrl = '/posts/'
    }
    const appUrl = process.env.NEXT_PUBLIC_APP_URL
    const isAppUrl = decodedUrl.startsWith(appUrl)
    const sanitizedUrl = isAppUrl ? decodedUrl : '/posts/'

    setCallbackUrl(sanitizedUrl)
  }, [])

  async function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const email = formData.get('email')
    const password = formData.get('password')

    const isInputValid = validateSignIn({ email, password })
    if (!isInputValid) {
      router.push('/login?error=CredentialsSignin')
    }

    try {
      await signIn('credentials', { email, password, callbackUrl: callbackUrl })
    } catch (error) {
      console.error('Sign-in error:', error)
    }
  }

  if (session) {
    return <AlreadySignedIn />
  }

  return (
    <SimpleCardWrapper name="login" header="Login" headerClasses="capitalize">
      <form className="login-form my-4" onSubmit={handleSubmit} noValidate>
        {errorMessage && (
          <div className="login-error-container flex w-full items-center mb-4 px-4 py-2 rounded-lg text-red-500 text-sm bg-red-50">
            <div className="login-error-ico w-12">
              <ErrorTriangleIco color="red" />
            </div>
            <p className="login-error-text ml-4">{errorMessage}</p>
          </div>
        )}

        <div className="login-email">
          <label
            className="login-email-label text-app-blue-text block mb-1"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className={`login-email-input 
              w-full px-4 py-2 
              rounded-lg glass-blue-soft
              text-app-blue-text 
              resize-none 
              focus:outline-none 
              input-autofill-override
              ${
                errorMessage ? 'focus:border-red-500' : 'focus:border-app-blue'
              } `}
            type="email"
            name="email"
            id="email"
            required
            placeholder="Enter your email"
          />
        </div>

        <div className="login-password mt-4">
          <label
            htmlFor="password"
            className="login-password-label text-app-blue-text block mb-1"
          >
            Password
          </label>
          <input
            className={`login-password-input 
              w-full 
              px-4 py-2 
              rounded-lg glass-blue-soft
              text-app-blue-text 
              resize-none 
              focus:outline-none 
              input-autofill-override
              ${
                errorMessage ? 'focus:border-red-500' : 'focus:border-app-blue'
              } `}
            type="password"
            name="password"
            id="password"
            required
            placeholder="Enter your password"
          />
        </div>

        <div className="forgot-password-container text-right">
          <Link href="/account/forgot-password">
            <span className="text-app-blue-text text-sm cursor-pointer hover:underline">
              Forgot password?
            </span>
          </Link>
        </div>

        <SimpleCardSubmitBtn text="Login" className="!mt-14" />

        <div className="register-container mt-2 text-center">
          <span className="text-app-blue-text text-sm">
            Don&apos;t have an account?
          </span>
          <Link href="/register">
            <span className="ml-1 text-app-blue-text text-sm font-semibold cursor-pointer hover:underline">
              Register now
            </span>
          </Link>
        </div>
      </form>
    </SimpleCardWrapper>
  )
}
