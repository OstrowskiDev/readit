export function ProfileFormButtons({ handleSubmit, handleCancel }) {
  return (
    <div className="flex justify-center mt-4">
      <div className="wrapper-orange-btn-bg">
        <button
          type="button"
          onClick={handleCancel}
          className="form-cancel-button button-silver h-10 py-[6px] px-4 font-bold text-md"
        >
          Cancel
        </button>
      </div>

      <div className="wrapper-orange-btn-bg ml-4">
        <button
          type="submit"
          onClick={handleSubmit}
          className="form-submit-btn button-orange-strong h-10 py-[6px] px-4 font-bold text-md"
        >
          Save changes
        </button>
      </div>
    </div>
  )
}
