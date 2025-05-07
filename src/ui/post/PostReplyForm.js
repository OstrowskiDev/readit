'use client'

import { createComment } from '@/lib/actions/comment'
import { usePostContext } from '@/lib/context/PostContextProvider'
import { useToastContext } from '@/lib/toasts/ToastProvider'
import { ReplyFormBtns } from '@/ui/buttons/ReplyFromBtns'
import cloneDeep from 'lodash/cloneDeep'
import { signIn, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { TextEditor } from '../tekst-editor/TextEditor'

export function PostReplyForm({ isCommFormVisible, setIsCommFormVisible }) {
  const [input, setInput] = useState('')
  const { data: session } = useSession()
  const userId = session?.user?.id
  const { comments, setComments, postId, post, setPost } = usePostContext()
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

  async function onSubmit() {
    const parentType = 'post'
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
    setIsCommFormVisible(!isCommFormVisible)
    setInput('')
  }

  function onCancelClick() {
    setIsCommFormVisible(!isCommFormVisible)
  }

  function handleEditorToggle() {
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
      content: input,
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
        <div className="post-reply-form change-border-on-child-focus p-2 ml-4 mr-1 my-1 bg-white border border-slate-300 rounded-lg">
          <form>
            {toggleTextEditor ? (
              <TextEditor /> // this component needs formData, setFormData, onContentChange to function, laso formData now needs: formData.markdown, formData.toggleEditor, formData.content(?)
            ) : (
              <textarea
                id="content"
                name="content"
                className="post-reply-input w-full h-32 border-none focus:outline-none"
                placeholder="Add your comment"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            )}

            <ReplyFormBtns
              onCancelClick={onCancelClick}
              onSubmit={onSubmit}
              handleEditorToggle={handleEditorToggle}
            />
          </form>
        </div>
      )}
    </>
  )
}
