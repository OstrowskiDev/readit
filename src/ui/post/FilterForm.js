'use client'

import { FilterFormBtns } from '@/ui/buttons/FilterFormBtns'

export function FilterForm({
  isFilterFormVis,
  setIsFilterFormVis,
  disableFilteringByAuthor,
  onSubmit,
  formState,
  setFormState,
  enableActivityFilter,
}) {
  const handleInputChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const textareaCss =
    ' glass-blue-strong rounded-md text-app-blue-alpha w-full h-7 px-2  resize-none focus:border-app-blue-alpha focus:outline-none'

  return (
    <>
      {isFilterFormVis && (
        <div className="filter-posts-form glass-blue-strong px-2 py-2 md:pt-6 md:pb-4 md:mb-2 md:rounded-lg md:shadow-center-md below-md:border-t ">
          <form className="filter-form font-orbitron text-14 grid grid-cols-1 2col-filter:grid-cols-2 gap-2">
            <div className="filter-title-container flex px-4">
              <p className="filter-title-label w-[100px]">title:</p>
              <textarea
                className={`filter-title-input ${textareaCss}`}
                id="title"
                name="title"
                placeholder=""
                value={formState.title}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    onSubmit()
                  }
                }}
              />
            </div>
            <div className="filter-author-container flex px-4">
              <p
                className={`filter-author-label w-[100px] ${
                  disableFilteringByAuthor && 'text-gray-400'
                }`}
              >
                author:
              </p>
              <textarea
                className={`filter-author-input ${textareaCss} ${
                  disableFilteringByAuthor &&
                  'bg-gray-100 border-gray-200 cursor-not-allowed'
                }`}
                id="author"
                name="author"
                placeholder=""
                value={formState.author}
                onChange={handleInputChange}
                disabled={disableFilteringByAuthor ? true : false}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    onSubmit()
                  }
                }}
              />
            </div>
            <div className="filter-content-container flex px-4">
              <p className="filter-content-label w-[100px]">content:</p>
              <textarea
                className={`filter-content-input ${textareaCss}`}
                id="content"
                name="content"
                placeholder=""
                value={formState.content}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    onSubmit()
                  }
                }}
              />
            </div>
            <div className="filter-sort-by-container flex px-4">
              <p className="filter-sort-by-label w-[100px]">sort by:</p>
              <select
                className={`filter-sort-by-input ${textareaCss}`}
                id="sortBy"
                name="sortBy"
                placeholder=""
                value={formState.sortBy}
                onChange={handleInputChange}
              >
                <option value={'time'}>time</option>
                <option value={'popularity'}>popularity</option>
                {enableActivityFilter && (
                  <option value={'activity'}>activity</option>
                )}
              </select>
            </div>
            <div className="filter-sort-order-container flex px-4">
              <p className="filter-sort-order-label w-[100px]">order:</p>
              <select
                className={`filter-sort-order-input ${textareaCss}`}
                id="sortOrder"
                name="sortOrder"
                placeholder=""
                value={formState.sortOrder}
                onChange={handleInputChange}
              >
                <option value={'descending'}>descending</option>
                <option value={'ascending'}>ascending</option>
              </select>
            </div>
            <div className="px-2">
              <FilterFormBtns
                isFilterFormVis={isFilterFormVis}
                setIsFilterFormVis={setIsFilterFormVis}
                onSubmit={onSubmit}
              />
            </div>
          </form>
        </div>
      )}
    </>
  )
}
