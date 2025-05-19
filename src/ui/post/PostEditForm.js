'use client'

import { updatePost } from '@/lib/actions/post'
import { usePostContext } from '@/lib/context/PostContextProvider'
import { hasErrors } from '@/lib/security/hasErrors'
import { validatePost, validationObject } from '@/lib/security/validatePost'
import { useToastContext } from '@/lib/toasts/ToastProvider'
import { useEffect, useState } from 'react'
import { EditFormBtns } from '../buttons/EditFormBtns'
import { TextEditor } from '../tekst-editor/TextEditor'

export function PostEditForm({ isEditFormVisible, setIsEditFormVisible }) {
  const [fieldValidity, setFieldValidity] = useState(validationObject)
  const { toastFunctions: toast } = useToastContext()
  const { post, setPost } = usePostContext()
  const [response, setResponse] = useState(null)
  const [oldPost, setOldPost] = useState(post)
  const [imageFile, setImageFile] = useState(null)
  const [imageAction, setImageAction] = useState('no_change')
  const [tempImageUrl, setTempImageUrl] = useState(null)
  const [formData, setFormData] = useState({
    title: post.title,
    content: post.content,
    markdown: '',
    toggleEditor: 'formated_text_editor',
  })

  useEffect(() => {
    const results = validatePost(formData)
    setFieldValidity(results)
  }, [formData])

  useEffect(() => {
    if (!imageFile) return
    const url = URL.createObjectURL(imageFile)
    setTempImageUrl(url)

    return () => {
      URL.revokeObjectURL(url)
    }
  }, [imageFile])

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

  function onTitleChange(event) {
    setFormData({ ...formData, title: event.target.value })
  }

  function onContentChange(string) {
    setFormData({ ...formData, content: string })
  }

  function onCancelClick() {
    setFormData({ title: post.title, content: post.content })
    setIsEditFormVisible(false)
  }

  async function onSubmit() {
    setOldPost(post)

    // !!!! add error messages to title and content
    const validationResults = validatePost(formData)
    if (hasErrors(validationResults)) {
      return
    }

    // client side image validation is done in AttachImageBtn component
    let imageData = new FormData()
    if (imageAction === 'no_chagne') {
      imageData.append('imageStatus', 'no_change')
    } else if (imageAction === 'update') {
      imageData.append('file', imageFile)
      imageData.append('imageStatus', 'update')
    } else if (imageAction === 'delete') {
      imageData.append('imageStatus', 'delete')
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
    if (imageAction === 'update') {
      const newPost = {
        ...post,
        ...formData,
        has_image: true,
        temp_image_url: tempImageUrl,
      }
      setPost(newPost)
    }
    if (imageAction === 'delete') {
      const newPost = {
        ...post,
        ...formData,
        has_image: false,
        temp_image_url: null,
      }
      setPost(newPost)
    }
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
              onChange={onTitleChange}
            />
            <div className="post-title-feedback flex flex-row justify-between">
              <label className="post-title-error text-xs text-red-500">
                {fieldValidity.title.message.length > 0 &&
                  fieldValidity.title.message.join(' ')}
              </label>
              <div
                className={`post-title-charcount px-2 text-xs ${
                  formData.title.length <= 60 ? 'text-gray-600' : 'text-red-500'
                }`}
              >
                {formData.title.length}/60
              </div>
            </div>
            <h3 className="post-edit-form-label ml-2 mt-4 text-md text-gray-800 ">
              content:
            </h3>

            <div className="change-border-on-child-focus p-2 mb-4 bg-gray-50 border border-slate-300 rounded-md">
              <TextEditor
                onContentChange={onContentChange}
                formData={formData}
                setFormData={setFormData}
              />
            </div>
            <EditFormBtns
              onCancelClick={onCancelClick}
              onSubmit={onSubmit}
              setResponse={setResponse}
              imageFile={imageFile}
              setImageFile={setImageFile}
              imageAction={imageAction}
              setImageAction={setImageAction}
              hasImage={post?.has_image}
            />
          </form>
        </div>
      )}
    </>
  )
}
