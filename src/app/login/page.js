'use client'

import { signIn } from 'next-auth/react'
import { useEffect, useState } from 'react'

export default function SignInForm() {
  const [callbackUrl, setCallbackUrl] = useState(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const encodedUrl = params.get('callbackUrl')
    let decodedUrl = decodeURIComponent(encodedUrl)

    const urlPattern = new RegExp('^(http|https)://', 'i')
    if (!decodedUrl.match(urlPattern)) {
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

  return (
    <div className="min-h-screen w-full bg-white flex justify-center items-center">
      <div className="bg-blue-500 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-white mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <label htmlFor="email" className="text-white block mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="w-full px-4 py-2 rounded-lg bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="password" className="text-white block mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              className="w-full px-4 py-2 rounded-lg bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <div className="mt-10">
            <button
              type="submit"
              className="w-full h-12 bg-white text-blue-500 py-2 rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 active:bg-blue-200 hover:text-lg"
              style={{ fontWeight: 'bold' }}
            >
              Login!
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
