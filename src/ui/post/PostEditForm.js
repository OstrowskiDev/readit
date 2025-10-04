'use client'

import { updatePost } from '@/lib/actions/post'
import { usePostContext } from '@/lib/context/PostContextProvider'
import { hasErrors } from '@/lib/security/hasErrors'
import { validatePost, validationObject } from '@/lib/security/validatePost'
import { useToastContext } from '@/lib/toasts/ToastProvider'
import { useEffect, useState } from 'react'
import { EditFormBtns } from '../buttons/EditFormBtns'
import { TextEditor } from '../tekst-editor/TextEditor'
import PostFormTitle from './PostFormTitle'

export function PostEditForm() {
  const { isEditFormVisible, setIsEditFormVisible } = usePostContext()
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
    toggleEditor: 'formatted_text_editor',
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

  function onContentChange(string) {
    setFormData({ ...formData, content: string })
  }

  function scrollToPost() {
    const postElement = document.querySelector('.post-container')
    postElement.scrollIntoView({ behavior: 'smooth' })
  }

  function onCancelClick() {
    setFormData({ title: post.title, content: post.content })
    setIsEditFormVisible(false)
    scrollToPost()
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
    if (imageAction === 'no_change') {
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
    scrollToPost()
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
        <div className="post-edit-form px-4 pb-6 mt-6 mb-4 btn-border-blue-strong border-x-0 rounded-none">
          <form>
            <h2 className="post-edit-header mt-6 ml-1 text-xl font-semibold">
              Edit post:
            </h2>

            <PostFormTitle
              fieldValidity={fieldValidity}
              formData={formData}
              setFormData={setFormData}
            />

            <h3 className="post-edit-form-label ml-2 mt-4 text-md ">
              content:
            </h3>

            <div className="change-border-on-child-focus bg-gray-950/20 btn-border-blue-soft mb-3 rounded-md">
              <TextEditor
                onContentChange={onContentChange}
                formData={formData}
                setFormData={setFormData}
                toggleTextEditor={true}
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
