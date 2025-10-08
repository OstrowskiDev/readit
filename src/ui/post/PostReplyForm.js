'use client'

import { createComment } from '@/lib/actions/comment'
import { usePostContext } from '@/lib/context/PostContextProvider'
import { parseMarkdownToHtml } from '@/lib/text-editor/parseMarkdownToHtml'
import { useToastContext } from '@/lib/toasts/ToastProvider'
import { ReplyFormBtns } from '@/ui/buttons/ReplyFromBtns'
import { TextEditor } from '@/ui/tekst-editor/TextEditor'
import cloneDeep from 'lodash/cloneDeep'
import { signIn, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

export function PostReplyForm({ isCommFormVisible, setIsCommFormVisible }) {
  const { data: session } = useSession()
  const userId = session?.user?.id
  const { comments, setComments, postId, post, setPost } = usePostContext()
  const initialFormData = {
    content: '',
    markdown: '',
    toggleEditor: 'formatted_text_editor',
  }
  const [formData, setFormData] = useState(initialFormData)
  const { toastFunctions: toast } = useToastContext()
  const [toggleTextEditor, setToggleTextEditor] = useState(false)

  const parentId = postId

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
      onOptimisticCreateCommentError()
    }
  }, [response])

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
    const parentType = 'post'
    if (!session) return signIn()

    if (formData.toggleEditor === 'markdown_editor') {
      const newHtmlString = parseMarkdownToHtml(formData.markdown)
      setFormData({ ...formData, content: newHtmlString })
    }

    const newCommentId = uuidv4().toString()
    optimisticUpdate(newCommentId)
    const serverResponse = await createComment(
      parentId,
      parentType,
      formData.content,
      newCommentId,
    )

    setResponse(serverResponse)
    setIsCommFormVisible(!isCommFormVisible)
    setFormData(initialFormData)
  }

  function onCancelClick() {
    setIsCommFormVisible(!isCommFormVisible)
  }

  function handleEditorToggle() {
    if (formData.toggleEditor === 'markdown_editor') {
      const newHtmlString = parseMarkdownToHtml(formData.markdown)
      setFormData({ ...formData, content: newHtmlString })
    }
    setToggleTextEditor(!toggleTextEditor)
  }

  function optimisticUpdate(newCommentId) {
    const newComment = {
      _id: newCommentId,
      user_id: userId,
      parent: {
        type: 'post',
        _id: parentId,
      },
      content: formData.content,
      replies: [],
      likes: [],
      dislikes: [],
      authorData: {
        _id: session.user.id,
        name: session.user.name,
        avatar: {
          seed: session.user.avatar.seed,
          color: session.user.avatar.color,
        },
      },
    }

    const newComments = cloneDeep(comments)
    newComments.push(newComment)
    const newPost = cloneDeep(post)
    if (!newPost.comments) newPost.comments = []
    newPost.comments.push(newCommentId)

    setComments(newComments)
    setPost(newPost)
  }

  function onOptimisticCreateCommentError() {
    const newCommentId = response.newCommentId
    const newComments = cloneDeep(comments)
    const oldComments = newComments.filter(
      (comment) => comment._id !== newCommentId,
    )
    setComments(oldComments)

    const oldReplies = post.comments.filter((id) => id !== newCommentId)
    const oldPost = cloneDeep(post)
    oldPost.comments = oldReplies
    setPost(oldPost)
  }

  return (
    <>
      {isCommFormVisible && (
        <div className="post-reply-form change-border-on-child-focus p-2 m-1 btn-border-blue-soft rounded-lg">
          <form>
            <TextEditor
              editorHeight={162}
              onContentChange={onContentChange}
              formData={formData}
              setFormData={setFormData}
              toggleTextEditor={toggleTextEditor}
            />

            <ReplyFormBtns
              onCancelClick={onCancelClick}
              onSubmit={onSubmit}
              handleEditorToggle={handleEditorToggle}
              toggleTextEditor={toggleTextEditor}
            />
          </form>
        </div>
      )}
    </>
  )
}
