import React from 'react'
import SmileyFaceIco from './icons/SmileyFaceIco'

export default function SideNav() {
  return (
    <div className="h-screen bg-gray-100 p-2 flex flex-col items-center">
      <div className=" bg-blue-500 w-56 h-56 rounded-md shadow-md">
        <div className="relative w-48 h-48 m-4 flex justify-center items-center">
          <SmileyFaceIco />
        </div>
      </div>
      <nav className="h-full w-full flex flex-col justify-between mt-2">
        <div className="flex flex-col grow space-y-2">
          <a
            href="/"
            className="w-full bg-white text-gray-800 py-2 pl-4 rounded-md hover:bg-blue-100 focus:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 shadow-md"
          >
            Home
          </a>
          <a
            href="/posts"
            className="w-full bg-white text-gray-800 py-2 pl-4 rounded-md hover:bg-blue-100 focus:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 shadow-md"
          >
            Posts
          </a>
          <a
            href="/groups"
            className="w-full bg-white text-gray-800 py-2 pl-4 rounded-md hover:bg-blue-100 focus:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 shadow-md"
          >
            My Groups
          </a>
          <a
            href="/settings"
            className="w-full bg-white text-gray-800 py-2 pl-4 rounded-md hover:bg-blue-100 focus:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 shadow-md"
          >
            My Profile
          </a>
          <div className="bg-white h-auto rounded-md grow shadow-md"></div>
        </div>
        <div className="mt-2">
          <button className="w-full bg-white text-gray-800 py-2 rounded-md hover:bg-blue-100 focus:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 shadow-md">
            Sign Out
          </button>
        </div>
      </nav>
    </div>
  )
}
