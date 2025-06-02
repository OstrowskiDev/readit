import { AttachedImage } from './AttachedImage'
import { AttachFileBtn } from './AttachFileBtn'

export function CreatePostFormBtns({
  onCancelClick,
  onSubmit,
  imageFile,
  setImageFile,
  setResponse,
  imageAction,
  setImageAction,
}) {
  return (
    <div className="post-reply-btns flex justify-end">
      <AttachedImage
        imageFile={imageFile}
        setImageFile={setImageFile}
        imageAction={imageAction}
        setImageAction={setImageAction}
      />
      <button
        className="post-reply-cancel-btn btn-gray py-1 px-2 mt-1"
        type="button"
        onClick={onCancelClick}
      >
        Cancel
      </button>
      <AttachFileBtn
        setImageFile={setImageFile}
        setResponse={setResponse}
        setImageAction={setImageAction}
      />
      <button
        className="post-reply-submit-btn button-orange-strong h-9 px-2 mx-2 mt-1"
        type="button"
        onClick={onSubmit}
      >
        Create
      </button>
    </div>
  )
}
