'use client'

import { filterPosts } from '@/app/lib/db'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { FilterForm } from './FilterForm'

export function FilterPostsForm({
  setTriggerReset,
  setPosts,
  isFilterFormVis,
  setIsFilterFormVis,
  onlyCurrentUserPosts,
  disableFilteringByAuthor,
}) {
  const [formState, setFormState] = useState({
    title: '',
    content: '',
    author: '',
    sortBy: 'time',
    sortOrder: 'descending',
  })

  const { title, content, author, sortBy, sortOrder } = formState

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  async function onSubmit() {
    let filterData = {
      title,
      content,
      author,
      sortBy,
      sortOrder,
    }
    const params = new URLSearchParams(searchParams)
    for (const key in filterData) {
      if (filterData[key]) {
        params.set(key, filterData[key])
      }
    }
    if (params.get('fastQuery')) {
      params.delete('fastQuery')
    }
    replace(`${pathname}?${params.toString()}`)

    if (onlyCurrentUserPosts) {
      filterData = { ...filterData, onlyCurrentUserPosts }
    }

    const postsData = await filterPosts(filterData)
    setPosts(postsData)
    setTriggerReset((prevState) => !prevState)
  }

  return (
    <FilterForm
      isFilterFormVis={isFilterFormVis}
      setIsFilterFormVis={setIsFilterFormVis}
      disableFilteringByAuthor={disableFilteringByAuthor}
      onSubmit={onSubmit}
      formState={formState}
      setFormState={setFormState}
      enableActivityFilter={true}
    />
  )
}
