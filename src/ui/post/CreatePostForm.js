'use client'

import { createPost } from '@/lib/actions/post'
import { hasErrors } from '@/lib/security/hasErrors'
import { validatePost, validationObject } from '@/lib/security/validatePost'
import { parseMarkdownToHtml } from '@/lib/text-editor/parseMarkdownToHtml'
import { useToastContext } from '@/lib/toasts/ToastProvider'
import { CreatePostFormBtns } from '@/ui/buttons/CreatePostFormBtns'
import { TextEditor } from '@/ui/tekst-editor/TextEditor'
import { signIn, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

export function CreatePostForm({
  isCreateFormVis,
  setIsCreateFormVis,
  posts,
  setPosts,
}) {
  const initialFormData = {
    title: '',
    content: '',
    markdown: '',
    toggleEditor: 'formated_text_editor',
  }

  const [formData, setFormData] = useState(initialFormData)
  const [imageFile, setImageFile] = useState(null)
  const [wasSubmitted, setWasSubmitted] = useState(false)
  const [fieldValidity, setFieldValidity] = useState(validationObject)
  const { data: session } = useSession()
  const { toastFunctions: toast } = useToastContext()

  const userId = session?.user?.id

  const [response, setResponse] = useState({
    state: null,
    message: null,
  })

  useEffect(() => {
    const results = validatePost(formData)
    setFieldValidity(results)
  }, [formData])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (response?.state === 'success') {
      toast.success(response.message)
    }
    if (response?.state === 'error') {
      toast.error(response.message)
      onOptimisticCreatePostError(response.newPostId)
    }
  }, [response])

  function optimisticUpdate(newPostId) {
    //!!!! optimistically add image?
    const newPost = {
      _id: newPostId,
      user_id: userId,
      title: formData.title,
      content: formData.content,
      comments: [],
      likes: [],
      dislikes: [],
      authorData: {
        name: session.user.name,
        _id: session.user.id,
        avatar: session.user.avatar,
      },
    }
    function caseInsensitiveMatch(param, postProperty) {
      const lowerParam = param?.toLowerCase()
      const lowerPostProperty = postProperty.toLowerCase()
      return !param || lowerPostProperty.includes(lowerParam)
    }

    const params = new URLSearchParams(window.location.search)
    const sortBy = params.get('sortBy') || 'time'
    const sortOrder = params.get('sortOrder') || 'descending'
    const author = params.get('author')
    const titleParam = params.get('title')
    const contentParam = params.get('content')

    const authorMatch = caseInsensitiveMatch(author, newPost.authorData.name)
    const titleMatch = caseInsensitiveMatch(titleParam, newPost.title)
    const contentMatch = caseInsensitiveMatch(contentParam, newPost.content)

    if (authorMatch && titleMatch && contentMatch) {
      if (
        (sortBy === 'time' && sortOrder === 'descending') ||
        (sortBy === 'popularity' && sortOrder === 'ascending') ||
        (sortBy === 'activity' && sortOrder === 'ascending')
      ) {
        setPosts([newPost, ...posts])
      } else {
        setPosts([...posts, newPost])
      }
    } else {
      console.log(
        "Created post doesn't match current filter criteria, and will not be displayed.",
      )
    }
  }

  function onOptimisticCreatePostError(postId) {
    const oldPosts = posts.filter((post) => post._id !== postId)
    setPosts(oldPosts)
  }

  function onTitleChange(event) {
    setFormData({ ...formData, title: event.target.value })
  }

  function onContentChange(string) {
    setFormData({ ...formData, content: string })
  }

  async function onSubmit() {
    if (!session) return signIn()
    setWasSubmitted(true)

    if (formData.toggleEditor === 'markdown_editor') {
      const newHtmlString = parseMarkdownToHtml(formData.markdown)
      setFormData({ ...formData, content: newHtmlString })
    }

    if (hasErrors(fieldValidity)) return
    // client side image validation  is done in AttachFileBtn component during attachment attempt

    const newPostId = uuidv4().toString()
    optimisticUpdate(newPostId)

    if (imageFile) {
      const imageData = new FormData()
      imageData.append('file', imageFile)

      const createImageResponse = await fetch(`api/images/${newPostId}.webp`, {
        method: 'PUT',
        body: imageData,
      })
      if (createImageResponse.status !== 200) {
        setResponse({ state: 'error', message: 'Failed to upload image.' })
        return
      }
    }

    const hasImage = imageFile ? true : false
    const serverResponse = await createPost(
      formData.title,
      formData.content,
      newPostId,
      hasImage,
    )
    setResponse(serverResponse)
    if (serverResponse.state !== 'success') return
    setIsCreateFormVis(!isCreateFormVis)
    setFormData(initialFormData)
    setImageFile(null)
    setWasSubmitted(false)
  }

  function onCancelClick() {
    setIsCreateFormVis(!isCreateFormVis)
  }

  return (
    <>
      <div
        className={`post-create-form p-4 md:mb-2 rounded-lg md:shadow-center-md ${
          isCreateFormVis ? '' : 'hidden'
        }`}
      >
        <form>
          <div className="post-title-container mb-2 ">
            <textarea
              className={`post-title-input w-full h-8 px-2 py-1  border border-slate-300 rounded-md bg-gray-50 resize-none border-none focus:outline-none ring-1 ${
                wasSubmitted && fieldValidity.title.message.length > 0
                  ? 'ring-red-400 focus:ring-red-500'
                  : 'ring-slate-300 focus:ring-blue-400'
              }`}
              id="title"
              name="title"
              placeholder="Type post title here"
              value={formData.title}
              onChange={onTitleChange}
            />
            <div className="post-title-feedback flex flex-row justify-between">
              <label className="post-title-error text-xs text-red-500">
                {fieldValidity.title.message.length > 0 &&
                  wasSubmitted &&
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
          </div>
          <div
            className={`post-content-container pr-1 pb-4 mt-2 bg-gray-50 rounded-md ring-1 ${
              wasSubmitted && fieldValidity.content.message.length > 0
                ? 'ring-red-400 focus-within:ring-red-500'
                : 'ring-slate-300 focus-within:ring-blue-400'
            }`}
          >
            <TextEditor
              onContentChange={onContentChange}
              formData={formData}
              setFormData={setFormData}
            />

            <CreatePostFormBtns
              onCancelClick={onCancelClick}
              onSubmit={onSubmit}
              imageFile={imageFile}
              setImageFile={setImageFile}
              setResponse={setResponse}
            />
          </div>
          <label className="post-content-error mb-2 text-xs text-red-500">
            {fieldValidity.content.message.length > 0 &&
              wasSubmitted &&
              fieldValidity.content.message.join(' ')}
          </label>
        </form>
      </div>
    </>
  )
}
