'use client'

import { createComment } from '@/app/lib/actions'
import { useState } from 'react'
import { useCommentContext } from '../lib/context/CommentContextProvider'
import { toast } from 'sonner'
import { useFormState, useFormStatus } from 'react-dom'
import { useEffect } from 'react'
import { Loader } from './Loader'

export function CommentReplyForm() {
  const { isVisible, setIsVisible, commentId, postId } = useCommentContext()
  const [input, setInput] = useState('')
  const parentId = commentId

  const [response, formAction] = useFormState(() => createComment(parentId, postId, input), {
    state: null,
    message: null,
  })

  useEffect(() => {
    if (response.state === 'success') {
      toast.success(response.message)
      setIsVisible(!isVisible)
      setInput('')
    }
    if (response.state === 'error') {
      toast.error(response.message)
      setIsVisible(!isVisible)
      setInput('')
    }
  }, [response])

  function SubmitButton() {
    const { pending } = useFormStatus()

    return (
      <button className="comment-reply-submit-btn btn-blue py-1 px-2 mx-2 mt-1" type="submit">
        Comment
        {pending && <Loader />}
      </button>
    )
  }

  function CancelButton() {
    return (
      <button
        className="comment-reply-cancel-btn btn-gray py-1 px-2 mt-1"
        type="button"
        onClick={() => setIsVisible(!isVisible)}
      >
        Cancel
      </button>
    )
  }

  return (
    <div className="comment-reply-form change-border-on-child-focus p-2 ml-4 mr-1 my-1 bg-white border border-slate-300 rounded-lg">
      <form action={formAction}>
        <textarea
          id="content"
          name="content"
          className="comment-reply-input w-full border-none focus:outline-none"
          placeholder="Add yor comment"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="comment-reply-btns flex justify-end">
          <CancelButton />
          <SubmitButton />
        </div>
      </form>
    </div>
  )
}
