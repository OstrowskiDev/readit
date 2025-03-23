export function FilterFormBtns({
  onSubmit,
  isFilterFormVis,
  setIsFilterFormVis,
}) {
  function onCancelClick() {
    setIsFilterFormVis(!isFilterFormVis)
  }

  return (
    <div className="filter-options-btns flex justify-end">
      <button
        className="filter-options-cancel-btn btn-gray py-1 px-2 mt-1"
        type="button"
        onClick={onCancelClick}
      >
        Cancel
      </button>
      <button
        className="filter-options-submit-btn btn-blue py-1 px-2 mx-2 mt-1"
        type="button"
        onClick={onSubmit}
      >
        Apply filters
      </button>
    </div>
  )
}
