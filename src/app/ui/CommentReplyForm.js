'use client'

import { useState } from 'react'
import { useEffect } from 'react'
import { useCommentContext } from '../lib/context/CommentContextProvider'
import { usePostContext } from '../lib/context/PostContextProvider'
import { v4 as uuidv4 } from 'uuid'
import { createComment } from '@/app/lib/actions'
import { signIn, useSession } from 'next-auth/react'
import cloneDeep from 'lodash/cloneDeep'

export function CommentReplyForm({ setResponse }) {
  const { isVisible, setIsVisible, commentId } = useCommentContext()
  const { comments, setComments, postId } = usePostContext()
  const [input, setInput] = useState('')
  const { data: session } = useSession()
  const userId = session?.user?.id
  const parentId = commentId

  async function onClick() {
    if (!session) signIn()
    const newCommentId = uuidv4().toString()
    optimisticUpdate(newCommentId)
    const serverResponse = await createComment(
      parentId,
      postId,
      input,
      newCommentId,
    )
    setResponse(serverResponse)
    setIsVisible(!isVisible)
    setInput('')
  }

  function optimisticUpdate(newCommentId) {
    const newComment = {
      _id: newCommentId,
      user_id: userId,
      parent: {
        type: 'comment',
        _id: parentId,
      },
      content: input,
      replies: [],
      likes: [],
      dislikes: [],
    }

    const newComments = cloneDeep(comments)
    newComments.push(newComment)

    const index = newComments.findIndex((comment) => comment._id === parentId)
    newComments[index].replies.push(newCommentId)
    setComments(newComments)
  }

  function SubmitButton() {
    return (
      <button
        className="comment-reply-submit-btn btn-blue py-1 px-2 mx-2 mt-1"
        type="submit"
        onClick={onClick}
      >
        Comment
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
          <CancelButton />
          <SubmitButton />
        </div>
      </form>
    </div>
  )
}
