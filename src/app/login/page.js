'use client'

import { signIn, useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import AlreadySignedIn from '../ui/AlreadySignedIn'
import Link from 'next/link'
import { ErrorTriangleIco } from '../ui/icons/ErrorTriangleIco'

export default function SignInForm() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const [callbackUrl, setCallbackUrl] = useState(null)
  const { data: session } = useSession()

  const errorMessage = getErrorMessage(error)

  function getErrorMessage(error) {
    if (!error) return null
    return error === 'CredentialsSignin'
      ? 'Invalid email or password. Please try again.'
      : 'An error occurred. Please try again.'
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const encodedUrl = params.get('callbackUrl')
    let decodedUrl = decodeURIComponent(encodedUrl)

    // !!!! this pattern needs to be change to env var representing the domain
    const httpsPattern = new RegExp('^https://', 'i')
    const httpPattern = new RegExp('^http://', 'i')

    const isHttps = decodedUrl.match(httpsPattern)
    const isHttp = decodedUrl.match(httpPattern)

    if (!isHttps && !isHttp) {
      decodedUrl = '/posts/'
    }

    setCallbackUrl(decodedUrl)
  }, [])

  async function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const email = formData.get('email')
    const password = formData.get('password')

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
    <div
      className="login-page w-full bg-white flex justify-center items-center"
      style={{ height: `calc(100vh - 72px)` }}
    >
      <div className="login-container flex flex-col justify-between w-[320px] h-[484px] p-8 rounded-lg bg-blue-500 shadow-lg">
        <h1 className="login-title text-2xl font-semibold text-white">Login</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          {errorMessage && (
            <div className="login-error-container flex w-full items-center mb-4 px-4 py-2 rounded-lg text-red-500 text-sm bg-red-100">
              <div className="login-error-ico w-12">
                <ErrorTriangleIco color="red" />
              </div>
              <p className="login-error-text ml-4">{errorMessage}</p>
            </div>
          )}
          <div className="login-email">
            <label
              className="login-email-label text-white block mb-1"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className={`login-email-input w-full px-4 py-2 rounded-lg bg-blue-100 focus:bg-white focus:outline-none ring-2 ${
                errorMessage
                  ? 'ring-red-400 focus:ring-red-500'
                  : 'ring-blue-500 focus:ring-blue-400'
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
              className="login-password-label text-white block mb-1"
            >
              Password
            </label>
            <input
              className={`login-password-input w-full px-4 py-2 rounded-lg bg-blue-100 focus:bg-white focus:outline-none ring-2 ${
                errorMessage
                  ? 'ring-red-400 focus:ring-red-500'
                  : 'ring-blue-500 focus:ring-blue-400'
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
              <span className="text-gray-300 text-sm cursor-pointer hover:underline">
                Forgot password?
              </span>
            </Link>
          </div>

          <div className="login-submit mt-4">
            <button
              className="login-submit-button w-full h-12 bg-white text-blue-500 py-2 rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 font-bold active:bg-blue-200 hover:text-lg"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>

        <div className="register-container mt-6 text-center">
          <span className="text-white text-sm">
            Don&apos;t have an account?
          </span>
          <Link href="/register">
            <span className="ml-1 text-white text-sm font-semibold cursor-pointer hover:underline">
              Register now
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}
