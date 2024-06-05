export function FilterBtn({ isFilterFormVis, setIsFilterFormVis }) {
  function onFilterClick() {
    setIsFilterFormVis(!isFilterFormVis)
  }

  return (
    <button
      onClick={onFilterClick}
      className="btn-blue h-10 px-4 xs:ml-2 ml-0 xs:grow"
    >
      Filter
    </button>
  )
}
