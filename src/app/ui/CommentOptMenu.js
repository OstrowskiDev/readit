'use client'

import { useSession } from 'next-auth/react'
import { useCommentContext } from '../lib/context/CommentContextProvider'
import { DeleteCommentBtn } from './buttons/DeleteCommentBtn'
import { useContext, useEffect, useState } from 'react'
import { deleteComment } from '../lib/actions'
import { ToastContext } from '../lib/toasts/ToastContext'
import { FavoritesBtn } from './buttons/FavoritesBtn'
import { EditCommentBtn } from './buttons/EditCommentBtn'

export function CommentOptMenu({ isMenuVisible, setIsMenuVisible }) {
  const {
    isEditVisible,
    setIsEditVisible,
    comment,
    commentId,
    postId,
    setDeleteOptimistically,
  } = useCommentContext()
  const { data: session } = useSession()
  const toast = useContext(ToastContext)
  const usersId = session?.user.id
  const isUsersComment = usersId === comment.user_id
  const documentId = commentId

  const [response, setResponse] = useState({
    state: null,
    message: null,
  })

  useEffect(() => {
    if (response.state === 'success') {
      toast.success(response.message)
    }
    if (response.state === 'error') {
      toast.error(response.message)
      handleOptimisticallyDeleteError()
    }
  }, [response])

  async function onDeleteSubmit() {
    handleDeleteOptimistically()
    const serverResponse = await deleteComment(commentId, postId)
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
          className={`menu-container flex flex-col absolute z-10 top-10 right-0  bg-white border border-gray-300 rounded-md`}
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
