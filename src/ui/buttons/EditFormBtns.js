import { AttachedImage } from './AttachedImage'
import { AttachFileBtn } from './AttachFileBtn'

export function EditFormBtns({
  onCancelClick,
  onSubmit,
  setResponse,
  imageFile,
  setImageFile,
  imageAction,
  setImageAction,
  hasImage,
}) {
  return (
    <div className="post-edit-btns flex justify-end">
      <AttachedImage
        hasImage={hasImage}
        imageFile={imageFile}
        setImageFile={setImageFile}
        imageAction={imageAction}
        setImageAction={setImageAction}
      />

      <button
        className="post-edit-cancel-btn btn-gray py-1 px-2 mt-1"
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
        className="post-edit-submit-btn btn-blue py-1 px-3 mx-2 mt-1"
        type="button"
        onClick={onSubmit}
      >
        Save changes
      </button>
    </div>
  )
}
