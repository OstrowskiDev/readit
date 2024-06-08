'use client'

import { createPost } from '@/app/lib/actions'
import { useEffect, useState } from 'react'
import { ReplyFormBtns } from './buttons/ReplyFromBtns'
import { signIn, useSession } from 'next-auth/react'
import { v4 as uuidv4 } from 'uuid'
import { useToastContext } from '../lib/toasts/ToastProvider'

export function CreatePostForm({
  isCreateFormVis,
  setIsCreateFormVis,
  posts,
  setPosts,
}) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const { data: session } = useSession()
  const { toastFunctions: toast } = useToastContext()

  const userId = session?.user?.id

  const [response, setResponse] = useState({
    state: null,
    message: null,
  })

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
    const newPost = {
      _id: newPostId,
      user_id: userId,
      title: title,
      content: content,
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
    const sortBy = params.get('sortBy')
    const sortOrder = params.get('sortOrder')
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

  async function onSubmit() {
    if (!session) return signIn()
    const newPostId = uuidv4().toString()
    optimisticUpdate(newPostId)
    const serverResponse = await createPost(title, content, newPostId)
    setResponse(serverResponse)
    setIsCreateFormVis(!isCreateFormVis)
    setTitle('')
    setContent('')
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
          <div className="change-border-on-child-focus p-1 mb-2 bg-gray-50 border border-slate-300 rounded-md">
            <textarea
              className="post-title-input w-full h-6 bg-gray-50 resize-none border-none focus:outline-none"
              id="title"
              name="title"
              placeholder="Type post title here"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="change-border-on-child-focus p-2 my-2 bg-gray-50 border border-slate-300 rounded-md">
            <textarea
              className="post-content-input w-full h-32 border-none focus:outline-none bg-gray-50"
              id="content"
              name="content"
              placeholder="Type post content here"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <ReplyFormBtns onCancelClick={onCancelClick} onSubmit={onSubmit} />
          </div>
        </form>
      </div>
    </>
  )
}
