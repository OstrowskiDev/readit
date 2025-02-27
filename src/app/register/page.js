'use client'

import { useState } from 'react'

export default function RegisterForm() {
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  async function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.target)

    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      fullName: formData.get('fullName'), // honeypot
    }

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const result = await res.json()
    if (!res.ok) {
      setError(result.error)
    } else {
      setSuccess('Account created successfully!')
      event.target.reset()
    }
  }

  return (
    <div
      className="register-page w-full bg-white flex justify-center items-center"
      style={{ height: `calc(100vh - 72px)` }}
    >
      <div className="register-container w-[320px] p-8 rounded-lg bg-blue-500 shadow-lg">
        <h1 className="register-title text-2xl font-semibold text-white mb-4">
          Register
        </h1>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="register-name mt-4">
            <label className="text-white block mb-1" htmlFor="name">
              name
            </label>
            <input
              className="w-full px-4 py-2 rounded-lg bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              name="name"
              id="name"
              required
              placeholder="Enter your name"
            />
          </div>
          <div className="register-email mt-4">
            <label className="text-white block mb-1" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-4 py-2 rounded-lg bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              name="email"
              id="email"
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="register-password mt-4">
            <label className="text-white block mb-1" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-4 py-2 rounded-lg bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              name="password"
              id="password"
              required
              placeholder="Enter your password"
            />
          </div>
          {/* Honeypot field */}
          <div className="register-fullName hidden">
            <label htmlFor="fullName">Full Name</label>
            <input type="text" name="fullName" id="fullName" />
          </div>
          <div className="register-submit mt-10">
            <button
              className="w-full h-12 bg-white text-blue-500 py-2 rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 font-bold active:bg-blue-200 hover:text-lg"
              type="submit"
            >
              Register!
            </button>
          </div>
        </form>
        {error && <p className="text-red-200 mt-4">{error}</p>}
        {success && <p className="text-white mt-4">{success}</p>}
      </div>
    </div>
  )
}
