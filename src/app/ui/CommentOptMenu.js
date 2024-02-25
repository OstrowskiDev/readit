import { useSession } from 'next-auth/react'
import { deleteComment } from '../lib/actions'
import { useCommentContext } from '../lib/context/CommentContextProvider'
import DeleteIco from './icons/DeleteIco'
import EditIco from './icons/EditIco'
import { SaveIco } from './icons/SaveIco'

export function CommentOptMenu({ isMenuVisible, setIsMenuVisible }) {
  const { isEditVisible, setIsEditVisible, commentId, postId, authorId } = useCommentContext()
  const { data: session } = useSession()
  const usersId = session?.user.id
  const isUsersComment = usersId === authorId

  function onEditClick() {
    setIsEditVisible(!isEditVisible)
    setIsMenuVisible(!isMenuVisible)
  }
  function onDeleteClick() {
    deleteComment(commentId, postId)
  }

  return (
    <div className="menu-container flex flex-col absolute z-10 top-10 right-0  bg-white border border-gray-300 rounded-md">
      {isUsersComment && (
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
      )}
      {isUsersComment && (
        <button
          className="menu-opt-delete-btn flex items-center px-8 py-2 hover:bg-gray-200"
          type="button"
          onClick={onDeleteClick}
        >
          <div className="menu-opt-delete-ico w-6 m-1 flex justify-center items-center">
            <DeleteIco />
          </div>
          <p className="menu-opt-delete-text ml-2 text-lg">Delete</p>
        </button>
      )}
      <button
        className="menu-opt-save-btn flex items-center px-8 py-2 hover:bg-gray-200"
        type="button"
      >
        <div className="menu-opt-save-ico w-5 m-1 flex justify-center items-center">
          <SaveIco />
        </div>
        <p className="menu-opt-save-text ml-2 text-lg">Save</p>
      </button>
    </div>
  )
}
