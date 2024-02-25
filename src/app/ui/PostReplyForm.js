'use client'

import { createComment } from '@/app/lib/actions'
import { useState } from 'react'
import { ReplyFormBtns } from './buttons/ReplyFromBtns'

export function PostReplyForm({ postId, isCommentFormVisible, setIsCommentFormVisible }) {
  const [input, setInput] = useState('')

  function onCancelClick() {
    setIsCommentFormVisible(!isCommentFormVisible)
  }

  function onSubmit() {
    setIsCommentFormVisible(!isCommentFormVisible)
    createComment(postId, input)
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
