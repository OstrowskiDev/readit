'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { getPost } from '@/app/lib/db'
import { updatePost } from '@/app/lib/actions'
import { useParams } from 'next/navigation'

export default function Page() {
  const { id } = useParams()
  const postId = id
  const [formData, setFormData] = useState({
    _id: '',
    title: '',
    user: '',
    content: '',
  })

  useEffect(() => {
    async function fetchPostData() {
      try {
        const post = await getPost(postId)
        setFormData({
          _id: post._id,
          title: post.title,
          user: post.user_id,
          content: post.content,
        })
      } catch (error) {
        console.log('Error fetching post data:', error)
      }
    }
    fetchPostData()
    console.log(formData)
  }, [postId])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    console.log(formData)
  }

  const updatePostWithId = updatePost.bind(null, postId)

  return (
    <div className="min-h-screen flex justify-center items-center w-full">
      <div className="mx-20 p-8 w-full xl:max-w-[58rem] rounded-lg  shadow-center-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Update Post</h2>
        <form action={updatePostWithId}>
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
              <option value="ad4fc3a1-0e2c-46e8-9d31-d3d2c66d9ac2">Alice Johnson</option>
              <option value="9e75c601-4ef2-4e85-b7de-3eb3a88299b9">Bob Smith</option>
              <option value="27278885-d8b4-4198-9a6f-4a61b145f206">Charlie Brown</option>
              <option value="ef3a0f16-1409-4e9a-b6a5-daf44d2b947c">Diana Miller</option>
              <option value="1a460586-e61b-4a69-bc9e-f7fc02e0ac09">Edward Davis</option>
              <option value="fb1a4e9e-4e24-4c07-b749-d775f1c3e20c">Fiona Wilson</option>
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
              href={`/posts/post/${postId}`}
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
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
