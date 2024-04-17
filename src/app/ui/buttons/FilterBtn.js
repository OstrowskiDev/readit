export function FilterBtn({ isFilterFormVis, setIsFilterFormVis }) {
  function onFilterClick() {
    setIsFilterFormVis(!isFilterFormVis)
  }

  return (
    <button onClick={onFilterClick} className="btn-blue h-10 px-4 ml-2">
      Filter
    </button>
  )
}
