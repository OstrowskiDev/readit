import React from 'react'

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full bg-white flex justify-center items-center">
      <div className="bg-blue-500 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-white mb-4">Login</h2>
        <form>
          <div className="mt-4">
            <label htmlFor="username" className="text-white block mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-2 rounded-lg bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="password" className="text-white block mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
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
