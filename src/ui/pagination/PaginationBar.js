import { useSearchParams } from 'next/navigation'
import { PaginationBtn, PaginationDots } from './PaginationBtn'

export function PaginationBar({ postsNum, filterOptions }) {
  const searchParams = useSearchParams()

  let currentPage = Number(searchParams.get('page'))
  if (!Number.isInteger(currentPage) || currentPage < 1) currentPage = 1

  let postsPerPage = Number(searchParams.get('limit'))
  if (![10, 25, 50].includes(postsPerPage)) postsPerPage = 10

  const paginationNum = Math.ceil(postsNum / postsPerPage)

  if (!postsPerPage || paginationNum < 2) return null

  return (
    <div className="pagination-wrapper">
      <div className="pagination-container flex justify-center">
        <PaginationBtn
          disabled={currentPage === 1 ? true : false}
          name="<<prev"
          shortName="<<"
          value={currentPage - 1}
          filterOptions={filterOptions}
        />
        {Array.from({ length: paginationNum }, (_, i) => {
          if (i > currentPage - 3 && i < currentPage + 3) {
            return (
              <PaginationBtn
                key={i}
                name={i + 1}
                value={i + 1}
                active={i + 1 === currentPage}
                filterOptions={filterOptions}
              />
            )
          } else if (i === currentPage - 3 || i === currentPage + 3) {
            return <PaginationDots key={i} />
          }
        })}
        <PaginationBtn
          name={'next>>'}
          shortName=">>"
          value={currentPage + 1}
          filterOptions={filterOptions}
          disabled={currentPage === paginationNum ? true : false}
        />
      </div>
    </div>
  )
}
