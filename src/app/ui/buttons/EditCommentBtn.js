import { EditIco } from '../icons/EditIco'

export function EditCommentBtn({
  setIsEditVisible,
  isEditVisible,
  setIsMenuVisible,
}) {
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
