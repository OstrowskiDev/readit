'use client'

import { createPost } from '@/app/lib/actions'
import { useEffect, useState } from 'react'
import { ReplyFormBtns } from './buttons/ReplyFromBtns'
import { signIn, useSession } from 'next-auth/react'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'sonner'
import cloneDeep from 'lodash/cloneDeep'

export function CreatePostForm({ isCreateFormVis, setIsCreateFormVis }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const { data: session } = useSession()
  const userId = session?.user?.id

  const [response, setResponse] = useState({
    state: null,
    message: null,
  })

  useEffect(() => {
    if (response.state === 'success') {
      toast.success(response.message)
    }
    if (response.state === 'error') {
      toast.error(response.message)
      // onOptimisticCreateCommentError()
    }
  }, [response])

  // export async function createPost(formData) {
  //   const session = await getServerSession(authOptions)
  //   const userId = session.user.id
  //   const uuid = uuidv4().toString()
  //   const inputTitle = formData.get('title')
  //   const title = validatePostTitle(inputTitle)
  //   const inputContent = formData.get('content')
  //   const content = validatePostContent(inputContent)

  //   const newPost = new Post({
  //     _id: uuid,
  //     title: title,
  //     user_id: userId,
  //     content: content,
  //   })

  async function onSubmit() {
    if (!session) signIn()
    const newPostId = uuidv4().toString()
    // optimisticUpdate(newPostId)
    const serverResponse = await createPost(title, content)
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
      {isCreateFormVis && (
        <div className="post-create-form p-4 rounded-lg shadow-center-md mb-2">
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
              <ReplyFormBtns
                onCancelClick={onCancelClick}
                onSubmit={onSubmit}
              />
            </div>
          </form>
        </div>
      )}
    </>
  )
}

// function optimisticUpdate(newCommentId) {
//   const newComment = {
//     _id: newCommentId,
//     user_id: userId,
//     parent: {
//       type: 'post',
//       _id: parentId,
//     },
//     content: input,
//     replies: [],
//     likes: [],
//     dislikes: [],
//   }

//   const newComments = cloneDeep(comments)
//   newComments.push(newComment)
//   const newPost = cloneDeep(post)
//   if (!newPost.comments) newPost.comments = []
//   newPost.comments.push(newCommentId)

//   const authorExists = authors.find((author) => author._id === userId)
//   if (!authorExists) {
//     const newAuthor = {
//       _id: session.user.id,
//       name: session.user.name,
//     }
//     const newAuthors = cloneDeep(authors)
//     newAuthors.push(newAuthor)
//     setAuthors(newAuthors)
//   }

//   setComments(newComments)
//   setPost(newPost)
// }

// function onOptimisticCreateCommentError() {
//   const newCommentId = response.newCommentId
//   const newComments = cloneDeep(comments)
//   const oldComments = newComments.filter(
//     (comment) => comment._id !== newCommentId,
//   )
//   setComments(oldComments)

//   const oldReplies = post.comments.filter((id) => id !== newCommentId)
//   const oldPost = cloneDeep(post)
//   oldPost.comments = oldReplies
//   setPost(oldPost)
// }
