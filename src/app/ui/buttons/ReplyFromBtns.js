import { AttachFileBtn } from './AttachFileBtn'

export function ReplyFormBtns({
  onCancelClick,
  onSubmit,
  setImageFile,
  imageFile,
  setResponse,
}) {
  return (
    <div className="post-reply-btns flex justify-end">
      <button
        className="post-reply-cancel-btn btn-gray py-1 px-2 mt-1"
        type="button"
        onClick={onCancelClick}
      >
        Cancel
      </button>
      <AttachFileBtn setImageFile={setImageFile} setResponse={setResponse} />
      <button
        className="post-reply-submit-btn btn-blue py-1 px-2 mx-2 mt-1"
        type="button"
        onClick={onSubmit}
      >
        Comment
      </button>
    </div>
  )
}
