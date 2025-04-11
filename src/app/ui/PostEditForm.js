'use client'

import { useEffect, useState } from 'react'
import { EditFormBtns } from './buttons/EditFormBtns'
import { usePostContext } from '../lib/context/PostContextProvider'
import { updatePost } from '../lib/actions'
import { useToastContext } from '../lib/toasts/ToastProvider'
import { validatePost } from '../lib/security/validatePost'

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

    // add post title length count to title
    // add error messages to title and content
    // integrate with component if needed

    //client side post validation
    //set errors if failed

    // check if image is: null/already exists/new File
    // set imageFile properly
    // change updatePost logic accordingly

    // send image, title, content as data = new FormData to server
    // create new FormData
    // append title, content
    // if (imageFile.status !== 'already exists') append image
    // send to serwer and await response

    // on serwer send image to R2 bucket first
    // if response success => update Post object in DB

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
        <div className="post-edit-form px-4 pb-4 my-6 border rounded-md border-gray-300 bg-gray-200">
          <form>
            <h2 className="post-edit-header mt-6 ml-1 text-xl font-semibold ">
              Edit post:
            </h2>
            <h3 className="post-edit-form-label ml-2 mt-4 text-md text-gray-800 ">
              title:
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
