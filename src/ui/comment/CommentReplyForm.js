'use client'

import { ToggleTextEditorBtn } from '../buttons/ToggleTextEditorBtn'
import { useCommentContext } from '@/lib/context/CommentContextProvider'
import { useToastContext } from '@/lib/toasts/ToastProvider'
import { createComment } from '@/lib/actions/comment'
import { TextEditor } from '../tekst-editor/TextEditor'
import { signIn, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import cloneDeep from 'lodash/cloneDeep'
import { v4 as uuidv4 } from 'uuid'
import { usePostContext } from '@/lib/context/PostContextProvider'

export function CommentReplyForm({ parentType }) {
  const {
    isReplyFormVis,
    setIsReplyFormVis,
    commentId,
    comments,
    setComments,
    formRef,
  } = useCommentContext()

  const initialFormData = {
    content: '',
    markdown: '',
    toggleEditor: 'formated_text_editor',
  }
  const [formData, setFormData] = useState(initialFormData)
  const [toggleTextEditor, setToggleTextEditor] = useState(false)
  const { data: session } = useSession()
  const { setTriggerRebuild } = usePostContext()
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

  function onContentChange(e) {
    if (!e.target) {
      setFormData({ ...formData, content: e })
    } else {
      setFormData({ ...formData, content: e.target.value })
    }
  }

  async function onSubmit() {
    if (!session) return signIn()
    const newCommentId = uuidv4().toString()
    optimisticUpdate(newCommentId)
    const serverResponse = await createComment(
      parentId,
      parentType,
      formData.content,
      newCommentId,
    )
    setResponse(serverResponse)
    setIsReplyFormVis(!isReplyFormVis)
    setFormData(initialFormData)
  }

  function handleEditorToggle() {
    setToggleTextEditor(!toggleTextEditor)
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
      content: formData.content,
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

  function onCancelClick() {
    setIsReplyFormVis(!isReplyFormVis)
    setTriggerRebuild((counter) => counter + 1)
  }

  function CancelButton() {
    return (
      <button
        className="comment-reply-cancel-btn btn-gray py-1 px-2 mt-1"
        type="button"
        onClick={onCancelClick}
      >
        Cancel
      </button>
    )
  }

  return (
    <div className="comment-reply-form-wrapper" ref={formRef}>
      {isReplyFormVis && (
        <div className="comment-reply-form change-border-on-child-focus p-2 ml-4 mr-1 my-1 bg-white border border-slate-300 rounded-lg">
          <form>
            <TextEditor
              editorHeight={162}
              onContentChange={onContentChange}
              formData={formData}
              setFormData={setFormData}
              toggleTextEditor={toggleTextEditor}
            />
            <div className="comment-reply-btns flex justify-end">
              <CancelButton />
              <ToggleTextEditorBtn handleEditorToggle={handleEditorToggle} />
              <SubmitButton />
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
