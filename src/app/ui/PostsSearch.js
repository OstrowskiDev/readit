'use client'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

export default function PostsSearch({ isFilterFormVis, setIsFilterFormVis }) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set('query', term)
    } else {
      params.delete('query')
    }
    replace(`${pathname}?${params.toString()}`)
  }, 700)

  function onFilterClick() {
    setIsFilterFormVis(!isFilterFormVis)
  }

  return (
    <div className="flex grow-2 below-md:mb-2">
      <input
        type="text"
        className="input-white w-full h-10 py-2 px-4"
        placeholder="Search..."
        onChange={(e) => {
          handleSearch(e.target.value)
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <button onClick={onFilterClick} className="btn-blue h-10 px-4 ml-2">
        Filter
      </button>
    </div>
  )
}
