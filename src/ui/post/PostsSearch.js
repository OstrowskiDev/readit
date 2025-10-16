'use client'
import { usePostsFilter } from '@/lib/hooks/usePostsFilter'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { useDebouncedCallback } from 'use-debounce'

export function PostsSearch({
  filterOptions,
  triggerReset,
  setTriggerReset,
  fastQuery,
  setFastQuery,
  setIsFilterFormVis,
}) {
  const inputRef = useRef()
  const { applyFastQuery } = usePostsFilter(filterOptions)
  const searchParams = useSearchParams()

  useEffect(() => {
    const queryString = searchParams.get('fastQuery')
    if (queryString) {
      setFastQuery(queryString)
    }
  }, [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (triggerReset) {
      inputRef.current.value = ''
      setTriggerReset(false)
    }
  }, [triggerReset])

  function onFocus() {
    setIsFilterFormVis(false)
  }

  function onChange(e) {
    const queryString = e.target.value
    setFastQuery(queryString)
    handleSearch(queryString)
  }

  const handleSearch = useDebouncedCallback(async (queryString) => {
    await applyFastQuery(queryString)
  }, 1000)

  return (
    <div className="flex grow-2 below-lg:mb-2 mr-2">
      <input
        ref={inputRef}
        type="text"
        className="input-white w-full h-10 py-2 px-4"
        placeholder="Search for title, content or authors name..."
        value={fastQuery}
        onChange={onChange}
        onFocus={onFocus}
      />
    </div>
  )
}
