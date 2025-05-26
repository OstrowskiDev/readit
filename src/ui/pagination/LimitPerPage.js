import { usePostsFilter } from '@/lib/hooks/usePostsFilter'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export function LimitPerPage({ filterOptions }) {
  const searchParams = useSearchParams()

  let postsPerPage = Number(searchParams.get('limit'))
  if (![10, 25, 50].includes(postsPerPage)) postsPerPage = 10

  const [pageLimit, setPageLimit] = useState(10)
  const { applyPageLimit } = usePostsFilter(filterOptions)

  useEffect(() => {
    if (postsPerPage) setPageLimit(postsPerPage)
  }, [])

  function onChange(e) {
    setPageLimit(e.target.value)
    applyPageLimit({ limit: pageLimit })
  }

  return (
    <div className="limit-per-page-container flex justify-left">
      <select value={pageLimit} onChange={onChange}>
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
      </select>
      <p className="limit-per-page-label ml-2 mt-[2px]">per page</p>
    </div>
  )
}
