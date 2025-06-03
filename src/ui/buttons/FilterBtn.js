export function FilterBtn({ isFilterFormVis, setIsFilterFormVis }) {
  function onFilterClick() {
    setIsFilterFormVis(!isFilterFormVis)
  }

  return (
    <button
      onClick={onFilterClick}
      className="filter-btn button-orange-strong below-xs:grow h-10 px-4 md:ml-2 ml-0"
    >
      Filter
    </button>
  )
}
