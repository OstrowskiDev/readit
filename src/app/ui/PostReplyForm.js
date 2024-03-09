'use client'

import { createComment } from '@/app/lib/actions'
import { useEffect, useState } from 'react'
import { ReplyFormBtns } from './buttons/ReplyFromBtns'
import { signIn, useSession } from 'next-auth/react'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'sonner'

export function PostReplyForm({
  postId,
  isCommentFormVisible,
  setIsCommentFormVisible,
}) {
  const [input, setInput] = useState('')
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
      if (response.optimisticUI === 'create post') {
        onOptimisticCreateCommentError()
      }
    }
  }, [response])

  function onCancelClick() {
    setIsCommentFormVisible(!isCommentFormVisible)
  }

  async function onSubmit() {
    if (!session) signIn()
    const newCommentId = uuidv4().toString()
    // optimisticUpdate(newCommentId)
    const parentId = postId
    const serverResponse = await createComment(
      parentId,
      postId,
      input,
      newCommentId,
    )
    setResponse(serverResponse)
    setIsCommentFormVisible(!isCommentFormVisible)
    setInput('')
  }

  return (
    <>
      {isCommentFormVisible && (
        <div className="post-reply-form change-border-on-child-focus p-2 ml-4 mr-1 my-1 bg-white border border-slate-300 rounded-lg">
          <form>
            <textarea
              id="content"
              name="content"
              className="post-reply-input w-full h-32 border-none focus:outline-none"
              placeholder="Add your comment"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <ReplyFormBtns onCancelClick={onCancelClick} onSubmit={onSubmit} />
          </form>
        </div>
      )}
    </>
  )
}
