'use client'

import { useState } from 'react'

export function NavbarPosts() {
  const [toggleCollapse, setToggleCollapse] = useState(false)

  return (
    <div className="flex flex-col w-full glass-blue-soft interactive-orange-strong">
      <p
        className="btn-orbitron px-3 py-2 text-app-blue-300 hover:text-app-orange-alpha/90 hover:cursor-pointer rounded-t-md select-none"
        onClick={() => setToggleCollapse((prevVal) => !prevVal)}
      >
        Posts
      </p>
      {toggleCollapse && (
        <div className="flex flex-col">
          <div className="separator h-[1px] bg-app-blue-alpha/30"></div>
          <a
            href="/posts"
            className="nav-sub-button interactive-orange-strong text-app-blue-300 btn-orbitron pl-6"
          >
            Recent
          </a>
          <div className="separator h-[1px] bg-app-blue-alpha/30"></div>
          <a
            href="/posts/favorites"
            className="nav-sub-button interactive-orange-strong text-app-blue-300 btn-orbitron pl-6"
          >
            Favorites
          </a>
          <div className="separator h-[1px] bg-app-blue-alpha/30"></div>
          <a
            href="/posts/my-posts"
            className="nav-sub-button interactive-orange-strong text-app-blue-300 btn-orbitron pl-6 rounded-b-lg"
          >
            My posts
          </a>
        </div>
      )}
    </div>
  )
}
