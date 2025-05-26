import { usePostsFilter } from '@/lib/hooks/usePostsFilter'

export function PaginationBtn({
  disabled = false,
  active = false,
  name,
  value,
  filterOptions,
}) {
  const { applyPagination } = usePostsFilter(filterOptions)

  async function handleClick() {
    await applyPagination(value)
  }

  return (
    <button
      className={`pagination-btn min-w-8 px-2 py-[2px] mx-1 rounded-md border ${
        active ? 'border-blue-300 bg-blue-200' : 'border-gray-300'
      } ${disabled ? 'text-gray-400 bg-gray-100' : 'hover:border-blue-400'}`}
      onClick={handleClick}
      disabled={disabled}
    >
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
