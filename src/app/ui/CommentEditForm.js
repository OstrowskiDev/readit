'use client'

import { updateReply } from '@/app/lib/actions'
import { useState } from 'react'
import { useCommentContext } from '../lib/context/CommentContextProvider'

export function CommentEditForm() {
  const { isEditVisible, setIsEditVisible, commentId, postId, commentContent } = useCommentContext()
  const [input, setInput] = useState(commentContent)

  function onCancelClick() {
    setIsEditVisible(!isEditVisible)
  }

  function onSubmit() {
    setIsEditVisible(!isEditVisible)
    updateReply(commentId, postId, input)
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
            className="comment-reply-cancel-btn btn-gray py-1 px-2 my-1"
            type="button"
            onClick={onCancelClick}
          >
            Cancel
          </button>
          <button
            className="comment-reply-submit-btn btn-blue py-1 px-6 mx-2 my-1"
            type="button"
            onClick={onSubmit}
          >
            Edit
          </button>
        </div>
      </form>
    </div>
  )
}
