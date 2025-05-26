import { useSearchParams } from 'next/navigation'
import { PaginationBtn } from './PaginationBtn'

export function PaginationBar({ postsNum, filterOptions }) {
  const searchParams = useSearchParams()

  let currentPage = Number(searchParams.get('page'))
  if (!Number.isInteger(currentPage) || currentPage < 1) currentPage = 1

  let postsPerPage = Number(searchParams.get('limit'))
  if (![10, 25, 50].includes(postsPerPage)) postsPerPage = 10

  const paginationNum = Math.ceil(postsNum / postsPerPage)

  if (!postsPerPage) return null

  return (
    <div className="pagination-container my-4">
      {paginationNum > 1 && currentPage !== 1 && (
        <PaginationBtn
          name={'prev'}
          value={currentPage - 1}
          filterOptions={filterOptions}
        />
      )}
      {Array.from({ length: paginationNum }, (_, i) => {
        return (
          <PaginationBtn
            key={i}
            name={i + 1}
            value={i + 1}
            filterOptions={filterOptions}
          />
        )
      })}
      {paginationNum > 1 && paginationNum !== currentPage && (
        <PaginationBtn
          name={'next'}
          value={currentPage + 1}
          filterOptions={filterOptions}
        />
      )}
    </div>
  )
}
