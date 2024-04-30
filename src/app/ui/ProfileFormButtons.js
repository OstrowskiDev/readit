export function ProfileFormButtons({ handleSubmit, handleCancel }) {
  return (
    <div className="flex justify-center mt-4">
      <button
        type="button"
        onClick={handleCancel}
        className="form-cancel-button py-[6px] px-4 bg-gray-200 hover:bg-gray-300 text-gray-600 hover:text-gray-700 font-bold rounded ml-4"
      >
        Cancel
      </button>

      <button
        type="submit"
        onClick={handleSubmit}
        className="form-submit-button py-[6px] px-4 ml-4 bg-blue-500 hover:bg-blue-600 text-white font-bold  rounded"
      >
        Save changes
      </button>
    </div>
  )
}
