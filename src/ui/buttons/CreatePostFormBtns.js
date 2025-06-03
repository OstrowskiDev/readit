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
        className="post-reply-cancel-btn button-silver py-1 px-2 mt-1 text-base"
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
      <div className="wrapper-orange-btn-bg mx-2 mt-1">
        <button
          className="post-reply-submit-btn button-orange-strong h-9 px-2 text-base"
          type="button"
          onClick={onSubmit}
        >
          Create
        </button>
      </div>
    </div>
  )
}
