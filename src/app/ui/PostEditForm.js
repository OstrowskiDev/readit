'use client'

import { useEffect, useState } from 'react'
import { EditFormBtns } from './buttons/EditFormBtns'
import { usePostContext } from '../lib/context/PostContextProvider'
import { updatePost } from '../lib/actions'
import { useToastContext } from '../lib/toasts/ToastProvider'

export function PostEditForm({ isEditFormVisible, setIsEditFormVisible }) {
  const { post, setPost } = usePostContext()
  const { toastFunctions: toast } = useToastContext()
  const [response, setResponse] = useState(null)
  const [oldPost, setOldPost] = useState(post)
  const [formData, setFormData] = useState({
    title: post.title,
    content: post.content,
  })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (response?.state === 'success') {
      toast.success(response.message)
    }
    if (response?.state === 'error') {
      toast.error(response.message)
      handleOptimisticError()
    }
  }, [response])

  function handleInputChange(event) {
    const { name, value } = event.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  function onCancelClick() {
    setFormData({ title: post.title, content: post.content })
    setIsEditFormVisible(false)
  }

  async function onSubmit() {
    setOldPost(post)
    const response = await updatePost(post._id, formData)
    setResponse(response)
    optimisticUpdate()
    setIsEditFormVisible(false)
  }

  function optimisticUpdate() {
    const newPost = { ...post, ...formData }
    setPost(newPost)
  }

  function handleOptimisticError() {
    setPost(oldPost)
  }

  return (
    <>
      {isEditFormVisible && (
        <div className="post-edit-form pb-4 my-2 border-t border-b border-gray-300">
          <form>
            <h3 className="post-edit-form-label ml-2 mt-4 text-md text-gray-800 ">
              edit post title:
            </h3>
            <div className="change-border-on-child-focus p-1 bg-gray-50 border border-slate-300 rounded-md">
              <textarea
                className="post-title-input w-full h-6 bg-gray-50 resize-none border-none focus:outline-none"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>
            <h3 className="post-edit-form-label ml-2 mt-4 text-md text-gray-800 ">
              edit post content:
            </h3>
            <div className="change-border-on-child-focus p-2 mb-4 bg-gray-50 border border-slate-300 rounded-md">
              <textarea
                className="post-content-input w-full h-32 border-none focus:outline-none bg-gray-50"
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
              />
            </div>
            <EditFormBtns onCancelClick={onCancelClick} onSubmit={onSubmit} />
          </form>
        </div>
      )}
    </>
  )
}
