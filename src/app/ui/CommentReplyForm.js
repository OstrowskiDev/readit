'use client'

import { createReply } from '@/app/lib/actions'
import { useState } from 'react'
import { useCommentContext } from '../lib/context/CommentContextProvider'

export function CommentReplyForm() {
  const { isVisible, setIsVisible, commentId, postId } = useCommentContext()
  const [input, setInput] = useState('')
  const parentId = commentId

  function onCancelClick() {
    setIsVisible(!isVisible)
  }

  function onSubmit() {
    setIsVisible(!isVisible)
    createReply(parentId, postId, input)
    setInput('')
  }

  return (
    <div className="comment-reply-form change-border-on-child-focus p-2 ml-4 mr-1 my-1 bg-white border border-slate-300 rounded-lg">
      <form>
        <textarea
          id="content"
          name="content"
          className="comment-reply-input w-full border-none focus:outline-none"
          placeholder="Add yor comment"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="comment-reply-btns flex justify-end">
          <button
            className="comment-reply-cancel-btn btn-gray py-1 px-2 mt-1"
            type="button"
            onClick={onCancelClick}
          >
            Cancel
          </button>
          <button
            className="comment-reply-submit-btn btn-blue py-1 px-2 mx-2 mt-1"
            type="button"
            onClick={onSubmit}
          >
            Comment
          </button>
        </div>
      </form>
    </div>
  )
}
