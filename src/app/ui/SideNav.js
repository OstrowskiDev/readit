import React from 'react'
import SmileyFaceIco from './icons/SmileyFaceIco'

export default function SideNav() {
  return (
    <div className="h-screen p-2 bg-white flex flex-col items-center">
      <div className=" bg-blue-500 w-56 h-56 rounded-md">
        <div className="relative w-48 h-48 m-4 flex justify-center items-center">
          <SmileyFaceIco />
        </div>
      </div>
      <nav className="h-full w-full flex flex-col justify-between mt-2">
        <div className="flex flex-col grow space-y-2">
          <a
            href="/"
            className="w-full bg-gray-100 text-blue-500 py-2 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          >
            Home
          </a>
          <a
            href="/posts"
            className="w-full bg-gray-100 text-blue-500 py-2 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          >
            Posts
          </a>
          <a
            href="/groups"
            className="w-full bg-gray-100 text-blue-500 py-2 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          >
            My Groups
          </a>
          <a
            href="/settings"
            className="w-full bg-gray-100 text-blue-500 py-2 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          >
            Settings
          </a>
          <div className="bg-gray-100 h-auto rounded-md grow"></div>
        </div>
        <div className="mt-2">
          <button className="w-full bg-gray-100 text-blue-500 py-2 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200">
            Sign Out
          </button>
        </div>
      </nav>
    </div>
  )
}
