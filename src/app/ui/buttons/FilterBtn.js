export function FilterBtn({ isFilterFormVis, setIsFilterFormVis }) {
  function onFilterClick() {
    setIsFilterFormVis(!isFilterFormVis)
  }

  return (
    <button
      onClick={onFilterClick}
      className="btn-blue below-xs:grow h-10 px-4 md:ml-2 ml-0"
    >
      Filter
    </button>
  )
}
