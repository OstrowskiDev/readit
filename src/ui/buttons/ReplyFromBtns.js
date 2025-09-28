import { ToggleTextEditorBtn } from './ToggleTextEditorBtn'

export function ReplyFormBtns({
  onCancelClick,
  onSubmit,
  handleEditorToggle,
  toggleTextEditor,
}) {
  return (
    <div className="post-reply-btns flex justify-end">
      <div className="wrapper-orange-btn-bg mt-1">
        <button
          className="post-reply-cancel-btn button-silver py-1 px-2"
          type="button"
          onClick={onCancelClick}
        >
          Cancel
        </button>
      </div>
      <ToggleTextEditorBtn
        handleEditorToggle={handleEditorToggle}
        toggleTextEditor={toggleTextEditor}
      />
      <div className="wrapper-orange-btn-bg mx-2 mt-1">
        <button
          className="post-reply-submit-btn button-orange-strong py-1 px-2"
          type="button"
          aria-label="Submit comment"
          onClick={onSubmit}
        >
          Create
        </button>
      </div>
    </div>
  )
}
