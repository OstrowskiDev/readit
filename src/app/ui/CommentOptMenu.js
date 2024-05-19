'use client'

import { useSession } from 'next-auth/react'
import { useCommentContext } from '../lib/context/CommentContextProvider'
import { EditIco } from './icons/EditIco'
import { DeleteCommentBtn } from './buttons/DeleteCommentBtn'
import { useContext, useEffect, useState } from 'react'
import { deleteComment } from '../lib/actions'
import { ToastContext } from '../lib/toasts/ToastContext'
import { FavoritesBtn } from './buttons/FavoritesBtn'

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

  function EditBtn() {
    function onEditClick() {
      setIsEditVisible(!isEditVisible)
      setIsMenuVisible(false)
    }

    return (
      <button
        className="menu-opt-edit-btn flex items-center px-8 py-2  hover:bg-gray-200"
        type="button"
        onClick={onEditClick}
      >
        <div className="menu-opt-edit-ico w-6 m-1 flex justify-center items-center">
          <EditIco />
        </div>
        <p className="menu-opt-edit-text ml-2 text-lg">Edit</p>
      </button>
    )
  }

  return (
    <>
      {isMenuVisible && (
        <div
          className={`menu-container flex flex-col absolute z-10 top-10 right-0  bg-white border border-gray-300 rounded-md`}
        >
          {isUsersComment && (
            <>
              <EditBtn />
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
            />
          )}
        </div>
      )}
    </>
  )
}
