import { usePostsFilter } from '@/lib/hooks/usePostsFilter'

export function PaginationBtn({
  disabled = false,
  active = false,
  name,
  value,
  filterOptions,
}) {
  const { applyPagination } = usePostsFilter(filterOptions)

  let btnClass = 'pagination-btn min-w-8 px-2 py-[2px] mx-1 rounded-md border '
  if (active) {
    btnClass +=
      'border-app-blue-alpha/70 text-app-blue-alpha glass-blue-strong interactive-blue-strong'
  } else if (disabled) {
    btnClass += 'text-gray-600 border-gray-600'
  } else {
    btnClass +=
      'interactive-blue-strong border-app-blue-alpha/50 text-app-blue-alpha/70'
  }

  async function handleClick() {
    await applyPagination(value)
  }

  return (
    <button className={btnClass} onClick={handleClick} disabled={disabled}>
      {name}
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
