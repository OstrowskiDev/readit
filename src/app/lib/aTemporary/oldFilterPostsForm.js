'use client'

import { useState } from 'react'
import { filterPosts } from '../lib/db'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FilterFormBtns } from './buttons/FilterFormBtns'

export function FilterPostsForm({
  setTriggerReset,
  setPosts,
  isFilterFormVis,
  setIsFilterFormVis,
  onlyCurrentUserPosts,
}) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [sortBy, setSortBy] = useState('time')
  const [sortOrder, setSortOrder] = useState('descending')

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
    <>
      {isFilterFormVis && (
        <div className="filter-posts-form py-4 px-2 rounded-lg shadow-center-md mb-2">
          <form className="grid grid-cols-1 2col-filter:grid-cols-2 gap-2">
            <div className="filter-title-container flex px-4">
              <p className="filter-title-label w-[90px]">title:</p>
              <textarea
                className="filter-title-input w-full h-7 px-2 bg-gray-50 resize-none border border-slate-300 rounded-md
                focus:border-slate-500 focus:outline-none"
                id="title"
                name="title"
                placeholder=""
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="filter-author-container flex px-4">
              <p
                className={`filter-author-label w-[90px] ${
                  onlyCurrentUserPosts && 'text-gray-400'
                }`}
              >
                author:
              </p>
              <textarea
                className={`filter-author-input w-full h-7 px-2 resize-none border rounded-md focus:outline-none ${
                  onlyCurrentUserPosts
                    ? 'bg-gray-100 border-gray-200 cursor-not-allowed'
                    : 'bg-gray-50 border-slate-300 focus:border-slate-500'
                }`}
                id="author"
                name="author"
                placeholder=""
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                disabled={onlyCurrentUserPosts ? true : false}
              />
            </div>
            <div className="filter-content-container flex px-4">
              <p className="filter-content-label w-[90px]">content:</p>
              <textarea
                className="filter-content-input w-full h-7 px-2 bg-gray-50 resize-none border border-slate-300 rounded-md
                focus:border-slate-500 focus:outline-none"
                id="content"
                name="content"
                placeholder=""
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div className="filter-sortBy-container flex px-4">
              <p className="filter-sortBy-label w-[90px]">sort by:</p>
              <select
                className="filter-sortBy-input w-full h-7 px-2 bg-gray-50 border border-slate-300 rounded-md
                focus:border-slate-500 focus:outline-none"
                id="sortBy"
                name="sortBy"
                placeholder=""
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value={'time'}>time</option>
                <option value={'popularity'}>popularity</option>
                <option value={'activity'}>activity</option>
              </select>
            </div>
            <div className="filter-sortOrder-container flex px-4">
              <p className="filter-sortOrder-label w-[90px]">order:</p>
              <select
                className="filter-sortOrder-input w-full h-7 px-2 bg-gray-50 border border-slate-300 rounded-md
                focus:border-slate-500 focus:outline-none"
                id="sortOrder"
                name="sortOrder"
                placeholder=""
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
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
