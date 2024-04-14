'use client'

import { useEffect, useState } from 'react'
import { ReplyFormBtns } from './buttons/ReplyFromBtns'
import { signIn, useSession } from 'next-auth/react'
import cloneDeep from 'lodash/cloneDeep'

export function FilterPostsForm({
  setPosts,
  isFilterFormVis,
  setIsFilterFormVis,
}) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  // time, popularity, activity
  const [sortBy, setSortBy] = useState('time')
  //descending or ascending
  const [sortOrder, setSortOrder] = useState('descending')
  const { data: session } = useSession()
  const userId = session?.user?.id

  const [response, setResponse] = useState({
    state: null,
    message: null,
  })

  async function onSubmit() {
    // setIsFilterFormVis(!isFilterFormVis)
  }

  function onCancelClick() {
    setIsFilterFormVis(!isFilterFormVis)
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
              <p className="filter-author-label w-[90px]">author:</p>
              <textarea
                className="filter-author-input w-full h-7 px-2 bg-gray-50 resize-none border border-slate-300 rounded-md
                focus:border-slate-500 focus:outline-none"
                id="author"
                name="author"
                placeholder=""
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
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
              <p className="filter-sortOrder-label w-[90px]">sort by:</p>
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
              <ReplyFormBtns
                onCancelClick={onCancelClick}
                onSubmit={onSubmit}
              />
            </div>
          </form>
        </div>
      )}
    </>
  )
}
