import { ToggleTextEditorBtn } from './ToggleTextEditorBtn'

export function ReplyFormBtns({ onCancelClick, onSubmit, handleEditorToggle }) {
  return (
    <div className="post-reply-btns flex justify-end">
      <button
        className="post-reply-cancel-btn btn-gray py-1 px-2 mt-1"
        type="button"
        onClick={onCancelClick}
      >
        Cancel
      </button>
      <ToggleTextEditorBtn handleEditorToggle={handleEditorToggle} />
      <button
        className="post-reply-submit-btn btn-blue py-1 px-2 mx-2 mt-1"
        type="button"
        onClick={onSubmit}
      >
        Create
      </button>
    </div>
  )
}
