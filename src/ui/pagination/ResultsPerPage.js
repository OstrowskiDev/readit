import { useSearchParams } from 'next/navigation'

export function ResultsPerPage({ postsNum }) {
  const searchParams = useSearchParams()

  let postsPerPage = Number(searchParams.get('limit'))
  if (![10, 25, 50].includes(postsPerPage)) postsPerPage = 10

  let currentPage = Number(searchParams.get('page'))
  if (!Number.isInteger(currentPage) || currentPage < 1) currentPage = 1

  const currentMin = 1 + (currentPage - 1) * postsPerPage
  const currentMax =
    currentPage * postsPerPage > postsNum
      ? postsNum
      : currentPage * postsPerPage
  const totalMax = postsNum

  return (
    <div className="results-per-page-container flex justify-left ml-2 mt-1 ">
      <p className="results-min-max ml-4">{`${currentMin} - ${currentMax} of ${totalMax}`}</p>
    </div>
  )
}
