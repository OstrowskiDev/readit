'use client'

import { useSession } from 'next-auth/react'
import { useCommentContext } from '../lib/context/CommentContextProvider'
import EditIco from './icons/EditIco'
import { SaveIco } from './icons/SaveIco'
import { DeleteCommentBtn } from './buttons/DeleteCommentBtn'

export function CommentOptMenu({ setIsMenuVisible }) {
  const { isEditVisible, setIsEditVisible, authorId } = useCommentContext()
  const { data: session } = useSession()
  const usersId = session?.user.id
  const isUsersComment = usersId === authorId

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

  function SaveBtn() {
    function onSaveClick() {
      console.log('this needs to be implemented!')
      setIsMenuVisible(false)
    }
    return (
      <button
        className="menu-opt-save-btn flex items-center px-8 py-2 hover:bg-gray-200"
        type="button"
        onClick={onSaveClick}
      >
        <div className="menu-opt-save-ico w-5 m-1 flex justify-center items-center">
          <SaveIco />
        </div>
        <p className="menu-opt-save-text ml-2 text-lg">Save</p>
      </button>
    )
  }

  return (
    <div
      className={`menu-container flex flex-col absolute z-10 top-10 right-0  bg-white border border-gray-300 rounded-md`}
    >
      {isUsersComment && <EditBtn />}
      {isUsersComment && <DeleteCommentBtn setIsMenuVisible={setIsMenuVisible} />}
      <SaveBtn />
    </div>
  )
}
