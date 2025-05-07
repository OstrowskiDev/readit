import { TextEditorIco } from '../icons/TextEditorIco'

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
      <button
        className="post-reply-text-editor-btn btn-blue w-8 h-8 p-1 ml-2 mt-1"
        type="button"
        onClick={handleEditorToggle}
      >
        <TextEditorIco color={'white'} />
      </button>
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
