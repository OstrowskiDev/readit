'use client'

import { useState } from 'react'

export function NavbarPosts() {
  const [toggleCollapse, setToggleCollapse] = useState(false)

  return (
    <div className="flex flex-col w-full rounded-md bg-white  shadow-md">
      <p
        className="p-3 hover:cursor-pointer hover:bg-blue-100 rounded-t-md select-none"
        onClick={() => setToggleCollapse((prevVal) => !prevVal)}
      >
        Posts
      </p>
      {toggleCollapse && (
        <div className="flex flex-col">
          <div className="separator h-[2px] bg-gray-200"></div>
          <a href="/posts" className="nav-sub-button pl-6">
            Recent
          </a>
          <div className="separator h-[2px] bg-gray-200"></div>
          <a href="/posts/favorites" className="nav-sub-button pl-6">
            Favorites
          </a>
          <div className="separator h-[2px] bg-gray-200"></div>
          <a
            href="/posts/my-posts"
            className="nav-sub-button pl-6 rounded-b-lg"
          >
            My posts
          </a>
        </div>
      )}
    </div>
  )
}
