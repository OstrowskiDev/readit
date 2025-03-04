'use client'

import { signIn, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import AlreadySignedIn from '../ui/AlreadySignedIn'
import Link from 'next/link'

export default function SignInForm() {
  const [callbackUrl, setCallbackUrl] = useState(null)
  const { data: session } = useSession()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const encodedUrl = params.get('callbackUrl')
    let decodedUrl = decodeURIComponent(encodedUrl)

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
        <h1 className="login-title text-2xl font-semibold text-white mb-4">
          Login
        </h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-email mt-4">
            <label
              className="login-email-label text-white block mb-1"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="login-email-input w-full px-4 py-2 rounded-lg bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="login-password-input w-full px-4 py-2 rounded-lg bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              name="password"
              id="password"
              required
              placeholder="Enter your password"
            />
          </div>
          <div className="forgot-password-container text-right">
            <Link href="/">
              <span className="text-gray-300 text-sm cursor-pointer hover:underline">
                Forgot password?
              </span>
            </Link>
          </div>
          <div className="login-submit mt-20">
            <button
              className="login-submit-button w-full h-12 bg-white text-blue-500 py-2 rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 font-bold active:bg-blue-200 hover:text-lg"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>

        <div className="register-container mt-6 text-center">
          <span className="text-white text-sm">Don't have an account?</span>
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
