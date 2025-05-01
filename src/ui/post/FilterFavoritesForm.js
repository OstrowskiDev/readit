'use client'

import { filterFavorites } from '@/lib/db'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FilterForm } from './FilterForm'
import { useState } from 'react'

export function FilterFavoritesForm({
  setTriggerReset,
  isFilterFormVis,
  setIsFilterFormVis,
  setPosts,
  setComments,
  setDocumentOrder,
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

    const fetchedData = await filterFavorites(filterData)
    const sortedData = fetchedData.map((document) => ({
      _id: document._id,
      type: document.type,
    }))
    setDocumentOrder(sortedData)

    const postsData = fetchedData.filter((document) => document.type === 'post')
    const commentsData = fetchedData.filter(
      (document) => document.type === 'comment',
    )
    setPosts(postsData)
    setComments(commentsData)
    setTriggerReset((prevState) => !prevState)
  }

  return (
    <FilterForm
      isFilterFormVis={isFilterFormVis}
      setIsFilterFormVis={setIsFilterFormVis}
      onSubmit={onSubmit}
      formState={formState}
      setFormState={setFormState}
      enableActivityFilter={false}
    />
  )
}
