export function FilterBtn({ isFilterFormVis, setIsFilterFormVis }) {
  function onFilterClick() {
    setIsFilterFormVis(!isFilterFormVis)
  }

  return (
    <div className="wrapper-orange-btn-bg md:ml-2 ml-0">
      <button
        onClick={onFilterClick}
        type="button"
        aria-label="Open filter options"
        aria-expanded={isFilterFormVis}
        className="filter-btn button-orange-strong below-xs:grow h-10 px-4 "
      >
        Filter
      </button>
    </div>
  )
}
