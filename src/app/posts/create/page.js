'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { createPost } from '@/app/lib/actions'

export default function Page() {
  const [formData, setFormData] = useState({
    title: '',
    user: '',
    content: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  return (
    <div className="min-h-screen flex justify-center items-center w-full">
      <div className="mx-20 p-8 w-full xl:max-w-[58rem] rounded-lg  shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create Post</h2>
        <form action={createPost}>
          <div className="mb-4">
            <label htmlFor="title" className="label">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="input-gray mt-1 w-full px-4 py-2"
              placeholder="Enter post title"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="user" className="label">
              User
            </label>
            <select
              id="user"
              name="user"
              value={formData.user}
              onChange={handleInputChange}
              className="input-gray mt-1 w-full px-4 py-2"
            >
              <option value="">Select user</option>
              <option value="Sofia Schmidt">Sofia Schmidt</option>
              <option value="Luca Müller">Luca Müller</option>
              <option value="Matteo Rossi">Matteo Rossi</option>
              <option value="Emma Jensen">Emma Jensen</option>
              <option value="Jan Kowalski">Jan Kowalski</option>
              <option value="Isabella Ivanova">Isabella Ivanova</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="label">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              rows="4"
              className="input-gray mt-1 w-full px-4 py-2"
              placeholder="Enter post content"
            />
          </div>
          <div className="flex flex-col-reverse lg:flex-row justify-end gap-4">
            <Link
              href="/posts"
              className="btn-gray flex justify-center w-full lg:w-24 py-2"
              style={{ color: 'black' }}
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="btn-blue w-full lg:w-32 py-2"
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
