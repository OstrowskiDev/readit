'use client'

import { updateComment } from '@/lib/actions/comment'
import { useCommentContext } from '@/lib/context/CommentContextProvider'
import { useToastContext } from '@/lib/toasts/ToastProvider'
import { useEffect, useState } from 'react'
import { cloneDeep } from 'lodash'

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
      <div className="wrapper-orange-btn-bg mx-2 my-1">
        <button
          className="comment-edit-submit-btn button-orange-strong py-1 px-6"
          type="button"
          onClick={onSubmit}
        >
          Edit
        </button>
      </div>
    )
  }

  function CancelBtn() {
    return (
      <div className="wrapper-orange-btn-bg my-1">
        <button
          className="comment-edit-cancel-btn button-silver py-1 px-2"
          type="button"
          onClick={onCancelClick}
        >
          Cancel
        </button>
      </div>
    )
  }

  function onCancelClick(event) {
    event.preventDefault()
    setIsEditVisible(!isEditVisible)
  }

  return (
    <>
      {isEditVisible && (
        <div className="comment-edit-form change-border-on-child-focus btn-border-blue-soft p-2 ml-4 mr-1 my-1 rounded-lg">
          <form onClick={(e) => e.preventDefault()}>
            <textarea
              id="content"
              name="content"
              className="comment-edit-input bg-app-blue/0 text-app-blue-text w-full border-none focus:outline-none overflow-y-auto resize-none"
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
