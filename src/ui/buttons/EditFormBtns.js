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
      <div className="wrapper-orange-btn-bg mt-1">
        <button
          className="post-edit-cancel-btn button-silver py-1 px-2"
          type="button"
          onClick={onCancelClick}
        >
          Cancel
        </button>
      </div>

      <AttachFileBtn
        setImageFile={setImageFile}
        setResponse={setResponse}
        setImageAction={setImageAction}
      />
      <div className="wrapper-orange-btn-bg mx-2 mt-1">
        <button
          className="post-edit-submit-btn button-orange-strong py-1 px-3"
          type="button"
          onClick={onSubmit}
        >
          Save changes
        </button>
      </div>
    </div>
  )
}
