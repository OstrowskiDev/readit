import { usePostsFilter } from '@/lib/hooks/usePostsFilter'

export function PaginationBtn({ name, value, filterOptions }) {
  const { getFilteredPosts } = usePostsFilter(filterOptions)

  async function handleClick() {
    await getFilteredPosts({ page: value })
  }

  return (
    <button
      className="pagination-btn min-w-8 px-2 py-[2px] mx-1 rounded-md border border-gray-300"
      onClick={handleClick}
    >
      {name}
    </button>
  )
}
