'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { deleteComment } from '@/lib/actions/comment'
import { useCommentContext } from '@/lib/context/CommentContextProvider'
import { useToastContext } from '@/lib/toasts/ToastProvider'
import { DeleteCommentBtn } from '../buttons/DeleteCommentBtn'
import { EditCommentBtn } from '../buttons/EditCommentBtn'
import { FavoritesBtn } from '../buttons/FavoritesBtn'
import { usePostContext } from '@/lib/context/PostContextProvider'

export function CommentOptMenu({ isMenuVisible, setIsMenuVisible }) {
  const { isEditVisible, setIsEditVisible, comment, commentId } =
    useCommentContext()
  const { setTriggerRebuild, comments, setComments } = usePostContext()
  const [oldComments, setOldComments] = useState(null)
  const { data: session } = useSession()
  const { toastFunctions: toast } = useToastContext()
  const usersId = session?.user.id
  const isUsersComment = usersId === comment.user_id
  const documentId = commentId

  const [response, setResponse] = useState({
    state: null,
    message: null,
  })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // delete has its own response handling due to it triggering dismount of this commponent, but favorites still needs below effect for toast handling:
  useEffect(() => {
    if (response?.state === 'success') {
      toast.success(response.message)
    }
    if (response?.state === 'error') {
      toast.error(response.message)
      handleOptimisticallyDeleteError()
    }
  }, [response])

  async function onDeleteSubmit() {
    handleDeleteOptimistically()
    setTriggerRebuild((counter) => counter + 1)
    const serverResponse = await deleteComment(commentId)
    if (serverResponse.state === 'success') {
      toast.success(serverResponse.message)
    } else {
      toast.error(serverResponse.message)
      handleOptimisticallyDeleteError()
    }
  }

  function handleDeleteOptimistically() {
    setOldComments(comments)

    let newComments = [...comments]
    newComments = newComments.filter((comm) => comm._id !== commentId)

    if (comment.parent.type === 'comment') {
      newComments = newComments.map((comm) => {
        if (comment.parent._id === comm._id) {
          return {
            ...comm,
            replies: comm.replies.filter((replyId) => replyId !== commentId),
          }
        } else {
          return comm
        }
      })
    }
    setComments(newComments)
  }

  function handleOptimisticallyDeleteError() {
    setComments(oldComments)
  }

  return (
    <>
      {isMenuVisible && (
        <div
          className={`menu-container flex flex-col absolute z-40 top-10 right-0  bg-white border border-gray-300 rounded-md`}
        >
          {isUsersComment && (
            <>
              <EditCommentBtn
                setIsEditVisible={setIsEditVisible}
                isEditVisible={isEditVisible}
                setIsMenuVisible={setIsMenuVisible}
              />
              <DeleteCommentBtn
                setIsMenuVisible={setIsMenuVisible}
                onDeleteSubmit={onDeleteSubmit}
              />
            </>
          )}
          {session && (
            <FavoritesBtn
              type={'comment'}
              setIsMenuVisible={setIsMenuVisible}
              setResponse={setResponse}
              documentId={documentId}
            />
          )}
        </div>
      )}
    </>
  )
}
