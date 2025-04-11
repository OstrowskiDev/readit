'use client'

import { useEffect, useState } from 'react'
import { EditFormBtns } from './buttons/EditFormBtns'
import { usePostContext } from '../lib/context/PostContextProvider'
import { updatePost } from '../lib/actions'
import { useToastContext } from '../lib/toasts/ToastProvider'
import { validatePost } from '../lib/security/validatePost'
import { hasErrors } from '../lib/security/hasErrors'

export function PostEditForm({ isEditFormVisible, setIsEditFormVisible }) {
  const validationObject = {
    title: { message: [] },
    content: { message: [] },
  }
  const [fieldValidity, setFieldValidity] = useState(validationObject)
  const { toastFunctions: toast } = useToastContext()
  const { post, setPost } = usePostContext()
  const [response, setResponse] = useState(null)
  const [oldPost, setOldPost] = useState(post)
  const [imageFile, setImageFile] = useState(null)
  const [formData, setFormData] = useState({
    title: post.title,
    content: post.content,
  })

  useEffect(() => {
    const results = validatePost(formData)
    setFieldValidity(results)
  }, [formData])

  useEffect(() => {
    if (post.has_image)
      setImageFile({ status: 'already exists', name: 'current image.webp' })
  }, [])

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

    // add error messages to title and content
    // integrate with component if needed

    const validationResults = validatePost(formData)
    if (hasErrors(validationResults)) {
      return
    }

    // client side image validation is already done in AttachImageBtn component

    let imageData = new FormData()
    if (imageFile) {
      imageData.append('file', imageFile)
      imageData.append('imageStatus', 'new')
    } else if (imageFile === null) {
      imageData.append('imageStatus', 'delete')
    } else if (imageFile.status === 'already exists') {
      imageData.append('imageStatus', 'no change')
    } else {
      console.error('Error sending image')
      setResponse({ state: 'error', message: 'Error sending image' })
      return
    }

    const postData = { title: formData.title, content: formData.content }

    const response = await updatePost(post._id, postData, imageData)
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
        <div className="post-edit-form px-4 pb-4 my-6 border rounded-md border-gray-300 bg-gray-200">
          <form>
            <h2 className="post-edit-header mt-6 ml-1 text-xl font-semibold ">
              Edit post:
            </h2>
            <h3 className="post-edit-form-label ml-2 mt-4 text-md text-gray-800 ">
              title:
            </h3>
            <textarea
              className={`post-title-input w-full h-8 bg-gray-50 resize-none border-none focus:outline-none ring-1 py-1 px-2 rounded-md ${
                fieldValidity.title.message.length > 0
                  ? 'ring-red-400 focus:ring-red-500'
                  : 'ring-slate-300 focus:ring-blue-400'
              }`}
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
            <div className="post-title-feedback flex flex-row justify-between">
              <label className="post-title-error text-xs text-red-500">
                {fieldValidity.title.message.length > 0 &&
                  fieldValidity.title.message.join(' ')}
              </label>
              <div
                className={`post-title-charcount px-2 text-xs ${
                  formData.title.length <= 40 ? 'text-gray-600' : 'text-red-500'
                }`}
              >
                {formData.title.length}/40
              </div>
            </div>
            <h3 className="post-edit-form-label ml-2 mt-4 text-md text-gray-800 ">
              content:
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
            <EditFormBtns
              onCancelClick={onCancelClick}
              onSubmit={onSubmit}
              setResponse={setResponse}
              imageFile={imageFile}
              setImageFile={setImageFile}
            />
          </form>
        </div>
      )}
    </>
  )
}
