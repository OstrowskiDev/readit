'use client'

import { updateComment } from '@/app/lib/actions'
import { useEffect, useState } from 'react'
import { useCommentContext } from '../lib/context/CommentContextProvider'
import { cloneDeep } from 'lodash'
import { useToastContext } from '../lib/toasts/ToastProvider'

export function CommentEditForm() {
  const {
    isEditVisible,
    setIsEditVisible,
    commentId,
    comment,
    comments,
    setComments,
  } = useCommentContext()
  const [input, setInput] = useState(comment.content)
  const [oldContent, setOldContent] = useState(null)
  const [response, setResponse] = useState({
    state: null,
    message: null,
    updatedCommentId: null,
  })
  const { toastFunctions: toast } = useToastContext()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (response?.state === 'success') {
      toast.success(response.message)
    }
    if (response?.state === 'error') {
      toast.error(response.message)
      handleOptimisticError()
    }
  }, [response])

  async function onSubmit(event) {
    event.preventDefault()
    setIsEditVisible(!isEditVisible)
    handleOptimistically()
    const serverResponse = await updateComment(commentId, input)
    setResponse(serverResponse)
  }

  function handleOptimistically() {
    const newComments = cloneDeep(comments)
    const oldComment = comments.find((comment) => comment._id === commentId)
    setOldContent(oldComment.content)

    const newComment = cloneDeep(oldComment)
    newComment.content = input
    const index = comments.findIndex((comment) => comment._id === commentId)
    newComments[index] = newComment

    setComments(newComments)
  }

  function handleOptimisticError() {
    const newComment = comments.find((comment) => comment._id === commentId)
    const oldComments = cloneDeep(comments)
    const oldComment = cloneDeep(newComment)
    oldComment.content = oldContent
    const index = comments.findIndex((comment) => comment._id === commentId)
    oldComments[index] = oldComment

    setComments(oldComments)
  }

  function SubmitBtn() {
    return (
      <button
        className="comment-edit-submit-btn btn-blue py-1 px-6 mx-2 my-1"
        type="button"
        onClick={onSubmit}
      >
        Edit
      </button>
    )
  }

  function CancelBtn() {
    return (
      <button
        className="comment-edit-cancel-btn btn-gray py-1 px-2 my-1"
        type="button"
        onClick={onCancelClick}
      >
        Cancel
      </button>
    )
  }

  function onCancelClick(event) {
    event.preventDefault()
    setIsEditVisible(!isEditVisible)
  }

  return (
    <>
      {isEditVisible && (
        <div className="comment-edit-form change-border-on-child-focus p-2 ml-4 mr-1 my-1 bg-white border border-slate-300 rounded-lg">
          <form onClick={(e) => e.preventDefault()}>
            <textarea
              id="content"
              name="content"
              className="comment-edit-input w-full border-none focus:outline-none"
              placeholder="Add yor comment"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onClick={(e) => e.preventDefault()}
            />
            <div className="comment-edit-btns flex justify-end">
              <CancelBtn />
              <SubmitBtn />
            </div>
          </form>
        </div>
      )}
    </>
  )
}
