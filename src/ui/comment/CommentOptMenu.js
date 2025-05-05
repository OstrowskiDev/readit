'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { deleteComment } from '@/lib/actions/comment'
import { useCommentContext } from '@/lib/context/CommentContextProvider'
import { useToastContext } from '@/lib/toasts/ToastProvider'
import { DeleteCommentBtn } from '../buttons/DeleteCommentBtn'
import { EditCommentBtn } from '../buttons/EditCommentBtn'
import { FavoritesBtn } from '../buttons/FavoritesBtn'

export function CommentOptMenu({ isMenuVisible, setIsMenuVisible }) {
  const {
    isEditVisible,
    setIsEditVisible,
    comment,
    commentId,
    setDeleteOptimistically,
  } = useCommentContext()
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
    const serverResponse = await deleteComment(commentId)
    setResponse(serverResponse)
  }

  function handleDeleteOptimistically() {
    setDeleteOptimistically(true)
  }

  function handleOptimisticallyDeleteError() {
    setDeleteOptimistically(false)
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
