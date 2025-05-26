'use client'

import { useState } from 'react'
import { FilterForm } from './FilterForm'
import { usePostsFilter } from '@/lib/hooks/usePostsFilter'

export function FilterPostsForm({
  filterOptions,
  setFastQuery,
  isFilterFormVis,
  setIsFilterFormVis,
  disableFilteringByAuthor,
}) {
  const [formState, setFormState] = useState({
    title: '',
    content: '',
    author: '',
    sortBy: 'time',
    sortOrder: 'descending',
  })

  const { applyFilters } = usePostsFilter(filterOptions)

  async function onSubmit() {
    setFastQuery('')
    await applyFilters(formState)
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
