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

  function onChange(e) {
    const queryString = e.target.value
    setFastQuery(queryString)
    handleSearch(queryString)
  }

  const handleSearch = useDebouncedCallback(async (queryString) => {
    await applyFastQuery(queryString)
  }, 1000)

  return (
    <div className="flex grow-2 below-md:mb-2 mx-2 md:mx-0">
      <input
        ref={inputRef}
        type="text"
        className="input-white w-full h-10 py-2 px-4"
        placeholder="Search for title, content or authors name..."
        value={fastQuery}
        onChange={onChange}
      />
    </div>
  )
}
