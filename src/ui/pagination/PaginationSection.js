import { LimitPerPage } from './LimitPerPage'
import { PaginationBar } from './PaginationBar'
import { ResultsPerPage } from './ResultsPerPage'

export default function PaginationSection({ filterOptions, postsCount }) {
  return (
    <>
      <div className="pagination-desktop below-xs:hidden flex flex-row justify-between mt-2">
        <ResultsPerPage filterOptions={filterOptions} postsNum={postsCount} />
        <PaginationBar filterOptions={filterOptions} postsNum={postsCount} />
        <LimitPerPage filterOptions={filterOptions} />
      </div>

      <div className="pagination-mobile xs:hidden flex flex-col justify-between mt-4">
        <div className="flex flex-row mb-8">
          <ResultsPerPage filterOptions={filterOptions} postsNum={postsCount} />
          <LimitPerPage
            filterOptions={filterOptions}
            className={`ml-auto mr-4`}
          />
        </div>
        <PaginationBar filterOptions={filterOptions} postsNum={postsCount} />
      </div>
    </>
  )
}
