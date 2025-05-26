import { usePostsFilter } from '@/lib/hooks/usePostsFilter'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

export function LimitPerPage({ filterOptions }) {
  const searchParams = useSearchParams()

  let postsPerPage = Number(searchParams.get('limit'))
  if (![10, 25, 50].includes(postsPerPage)) postsPerPage = 10

  const [pageLimit, setPageLimit] = useState(postsPerPage)
  const { applyPageLimit } = usePostsFilter(filterOptions)

  function onChange(e) {
    const value = e.target.value
    setPageLimit(value)
    applyPageLimit(value)
  }

  return (
    <div className="limit-per-page-container flex justify-left">
      <select
        value={pageLimit}
        onChange={onChange}
        className="limit-select px-1 text-center"
      >
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
      </select>
      <p className="limit-per-page-label ml-2 mt-[2px]">per page</p>
    </div>
  )
}
