export function EditFormBtns({ onCancelClick, onSubmit }) {
  return (
    <div className="post-edit-btns flex justify-end">
      <button
        className="post-edit-cancel-btn btn-gray py-1 px-2 mt-1"
        type="button"
        onClick={onCancelClick}
      >
        Cancel
      </button>
      <button
        className="post-edit-submit-btn btn-blue py-1 px-3 mx-2 mt-1"
        type="button"
        onClick={onSubmit}
      >
        Save changes
      </button>
    </div>
  )
}
