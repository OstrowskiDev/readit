'use client'

import { createComment } from '@/lib/actions/comment'
import { useCommentContext } from '@/lib/context/CommentContextProvider'
import { useToastContext } from '@/lib/toasts/ToastProvider'
import cloneDeep from 'lodash/cloneDeep'
import { signIn, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

export function CommentReplyForm({ parentType }) {
  const {
    isReplyFormVis,
    setIsReplyFormVis,
    commentId,
    comments,
    setComments,
  } = useCommentContext()

  const [input, setInput] = useState('')
  const { data: session } = useSession()
  const { toastFunctions: toast } = useToastContext()
  const parentId = commentId

  const [response, setResponse] = useState({
    state: null,
    message: null,
  })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (response?.state === 'success') {
      toast.success(response.message)
    }
    if (response?.state === 'error') {
      toast.error(response.message)
      if (response.optimisticUI === 'create post') {
        onOptimisticCreateCommentError()
      }
    }
  }, [response])

  function onOptimisticCreateCommentError() {
    const newCommentId = response.newCommentId
    const newComment = comments.find((comment) => comment._id === newCommentId)
    const parentId = newComment.parent._id
    const newComments = cloneDeep(comments)
    const oldComments = newComments.filter(
      (comment) => comment._id !== newCommentId,
    )
    const index = oldComments.findIndex((comment) => comment._id === parentId)
    const oldReplies = oldComments[index].replies.filter(
      (id) => id !== newCommentId,
    )
    oldComments[index].replies = oldReplies

    setComments(oldComments)
  }

  async function onSubmit() {
    if (!session) return signIn()
    const newCommentId = uuidv4().toString()
    optimisticUpdate(newCommentId)
    const serverResponse = await createComment(
      parentId,
      parentType,
      input,
      newCommentId,
    )
    setResponse(serverResponse)
    setIsReplyFormVis(!isReplyFormVis)
    setInput('')
  }

  function optimisticUpdate(newCommentId) {
    const newComment = {
      _id: newCommentId,
      user_id: session.user.id,
      parent: {
        type: 'comment',
        _id: parentId,
      },
      authorData: {
        name: session.user.name,
        avatar: {
          color: session.user.avatar.color,
          seed: session.user.avatar.seed,
        },
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
        type="button"
        onClick={onSubmit}
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
        onClick={() => setIsReplyFormVis(!isReplyFormVis)}
      >
        Cancel
      </button>
    )
  }

  return (
    <>
      {isReplyFormVis && (
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
      )}
    </>
  )
}
