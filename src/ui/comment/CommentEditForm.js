'use client'

import { updateComment } from '@/lib/actions/comment'
import { useCommentContext } from '@/lib/context/CommentContextProvider'
import { useToastContext } from '@/lib/toasts/ToastProvider'
import { useEffect, useState } from 'react'
import { cloneDeep } from 'lodash'
import { ToggleTextEditorBtn } from '../buttons/ToggleTextEditorBtn'
import { usePostContext } from '@/lib/context/PostContextProvider'
import { TextEditor } from '../tekst-editor/TextEditor'

export function CommentEditForm() {
  const {
    isEditVisible,
    setIsEditVisible,
    commentId,
    comment,
    comments,
    setComments,
    editFormRef,
  } = useCommentContext()
  const { setTriggerRebuild } = usePostContext()

  const initialFormData = {
    content: comment.content,
    markdown: '',
    toggleEditor: 'formatted_text_editor',
  }

  const [formData, setFormData] = useState(initialFormData)
  const [toggleTextEditor, setToggleTextEditor] = useState(false)
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

  async function onSubmit() {
    setIsEditVisible(!isEditVisible)
    handleOptimistically()
    setTriggerRebuild((counter) => counter + 1)
    const serverResponse = await updateComment(commentId, formData.content)
    setResponse(serverResponse)
  }

  function onCancelClick() {
    setIsEditVisible(!isEditVisible)
    setTriggerRebuild((counter) => counter + 1)
  }

  // Handle content changes from both ReactQuill and regular HTML inputs
  // ReactQuill onChange passes content directly as string (no e.target)
  // Regular inputs pass event object with e.target.value
  function onContentChange(e) {
    if (!e.target) {
      setFormData({ ...formData, content: e })
    } else {
      setFormData({ ...formData, content: e.target.value })
    }
  }

  function handleOptimistically() {
    const newComments = cloneDeep(comments)
    const oldComment = comments.find((comment) => comment._id === commentId)
    setOldContent(oldComment.content)

    const newComment = cloneDeep(oldComment)
    newComment.content = formData.content
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

  function handleEditorToggle() {
    setToggleTextEditor(!toggleTextEditor)
    setTriggerRebuild((counter) => counter + 1)
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

  return (
    <div className="comment-edit-form-wrapper" ref={editFormRef}>
      {isEditVisible && (
        <div className="comment-edit-form change-border-on-child-focus btn-border-blue-soft pr-2 pb-2 ml-4 mr-1 my-1 rounded-lg">
          <form>
            <TextEditor
              editorHeight={142}
              onContentChange={onContentChange}
              formData={formData}
              setFormData={setFormData}
              toggleTextEditor={toggleTextEditor}
            />
            <div className="comment-edit-btns flex justify-end">
              <CancelBtn />
              <ToggleTextEditorBtn
                handleEditorToggle={handleEditorToggle}
                toggleTextEditor={toggleTextEditor}
              />
              <SubmitBtn />
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
