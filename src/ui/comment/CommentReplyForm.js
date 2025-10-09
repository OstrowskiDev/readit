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
import { parseMarkdownToHtml } from '@/lib/text-editor/parseMarkdownToHtml'

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
    toggleEditor: 'formatted_text_editor',
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

  async function onSubmit() {
    if (!session) return signIn()
    const newCommentId = uuidv4().toString()
    const contentToSend =
      formData.toggleEditor === 'formatted_text_editor'
        ? formData.content
        : parseMarkdownToHtml(formData.markdown)
    optimisticUpdate(newCommentId, contentToSend)
    const serverResponse = await createComment(
      parentId,
      parentType,
      contentToSend,
      newCommentId,
    )
    setResponse(serverResponse)
    setIsReplyFormVis(!isReplyFormVis)
    setFormData(initialFormData)
    setTriggerRebuild((counter) => counter + 1)
  }

  function handleEditorToggle() {
    setToggleTextEditor(!toggleTextEditor)
    setTriggerRebuild((counter) => counter + 1)
  }

  function optimisticUpdate(newCommentId, contentToSend) {
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
      content: contentToSend,
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
      <div className="wrapper-orange-btn-bg mx-2">
        <button
          className="comment-reply-submit-btn button-orange-strong h-9 py-1 px-2"
          type="button"
          onClick={onSubmit}
        >
          Comment
        </button>
      </div>
    )
  }

  function onCancelClick() {
    setIsReplyFormVis(!isReplyFormVis)
    setTriggerRebuild((counter) => counter + 1)
  }

  function CancelButton() {
    return (
      <div className="wrapper-orange-btn-bg">
        <button
          className="comment-reply-cancel-btn button-silver h-9 py-1 px-2"
          type="button"
          onClick={onCancelClick}
        >
          Cancel
        </button>
      </div>
    )
  }

  return (
    <div className="comment-reply-form-wrapper" ref={formRef}>
      {isReplyFormVis && (
        <div className="comment-reply-form change-border-on-child-focus p-2 ml-4 mr-1 my-1 btn-border-blue-soft bg-black/10 rounded-lg">
          <form>
            <TextEditor
              editorHeight={142}
              onContentChange={onContentChange}
              formData={formData}
              setFormData={setFormData}
              toggleTextEditor={toggleTextEditor}
            />
            <div className="comment-reply-btns flex justify-end items-center">
              <CancelButton />
              <ToggleTextEditorBtn
                handleEditorToggle={handleEditorToggle}
                toggleTextEditor={toggleTextEditor}
              />
              <SubmitButton />
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
