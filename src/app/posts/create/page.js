'use client'

import Link from 'next/link'
import React, { useState } from 'react'

export default function CreatePost() {
  const [formData, setFormData] = useState({
    title: '',
    user: '',
    content: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // You can perform form submission logic here
    console.log('Form submitted:', formData)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center w-full">
      <div className="bg-white mx-20 p-8 w-full xl:max-w-[58rem] rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="mt-1 w-full px-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter post title"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="user" className="block text-sm font-medium text-gray-700">
              User
            </label>
            <select
              id="user"
              name="user"
              value={formData.user}
              onChange={handleInputChange}
              className="mt-1 w-full px-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select user</option>
              <option value="Sofia Schmidt1">Sofia Schmidt</option>
              <option value="Luca Müller">Luca Müller</option>
              <option value="Matteo Rossi">Matteo Rossi</option>
              <option value="Emma Jensen">Emma Jensen</option>
              <option value="Jan Kowalski">Jan Kowalski</option>
              <option value="Isabella Ivanova">Isabella Ivanova</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              rows="4"
              className="mt-1 w-full px-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter post content"
            />
          </div>
          <div className="flex flex-col-reverse lg:flex-row justify-end gap-4">
            <Link
              href="/posts"
              className="w-full lg:w-24 flex justify-center bg-gray-200 text-white py-2 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors duration-200"
              style={{ color: 'black' }}
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="w-full lg:w-32 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
              style={{ fontWeight: 'bold' }}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
