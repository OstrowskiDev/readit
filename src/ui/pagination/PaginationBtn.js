import { usePostsFilter } from '@/lib/hooks/usePostsFilter'

export function PaginationBtn({
  disabled = false,
  active = false,
  name,
  shortName = name,
  value,
  filterOptions,
}) {
  const { applyPagination } = usePostsFilter(filterOptions)

  let btnClass = 'pagination-btn min-w-8 px-2 py-[2px] mx-1 rounded-md border '
  if (active) {
    btnClass +=
      'border-app-blue/70 text-app-blue-text glass-blue-strong interactive-blue-strong'
  } else if (disabled) {
    btnClass += 'text-gray-600 border-gray-600'
  } else {
    btnClass +=
      'interactive-blue-strong border-app-blue/50 text-app-blue-text/70'
  }

  async function handleClick() {
    await applyPagination(value)
  }

  return (
    <button className={btnClass} onClick={handleClick} disabled={disabled}>
      <span className="below-xs:hidden">{name}</span>
      <span className="xs:hidden">{shortName}</span>
    </button>
  )
}

export function PaginationDots() {
  return (
    <button
      className="pagination-btn min-w-8 px-2 py-[2px] mx-1 rounded-md border border-gray-300"
      tabIndex={-1}
      disabled
    >
      ...
    </button>
  )
}
