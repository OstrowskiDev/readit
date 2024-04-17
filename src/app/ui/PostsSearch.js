'use client'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { useDebouncedCallback } from 'use-debounce'

export default function PostsSearch({
  triggerReset,
  setTriggerReset,
  setFastQuery,
  isFilterFormVis,
  setIsFilterFormVis,
}) {
  const searchParams = useSearchParams() // reads current URL's query string
  const pathname = usePathname() // reads current URL's pathname
  const { replace } = useRouter()
  const inputRef = useRef()

  useEffect(() => {
    if (triggerReset) {
      inputRef.current.value = ''
      setTriggerReset(false)
    }
  }, [triggerReset])

  const handleSearch = useDebouncedCallback((term) => {
    // create variable that stores the current query string
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set('fastQuery', term)
    } else {
      params.delete('fastQuery')
    }
    replace(`${pathname}?${params.toString()}`)
    setFastQuery(term)
  }, 700)

  function onFilterClick() {
    setIsFilterFormVis(!isFilterFormVis)
  }

  return (
    <div className="flex grow-2 below-md:mb-2">
      <input
        ref={inputRef}
        type="text"
        className="input-white w-full h-10 py-2 px-4"
        placeholder="Search for title, content or authors name..."
        onChange={(e) => {
          handleSearch(e.target.value)
        }}
        defaultValue={searchParams.get('fastQuery')?.toString()}
      />
      <button onClick={onFilterClick} className="btn-blue h-10 px-4 ml-2">
        Filter
      </button>
    </div>
  )
}
