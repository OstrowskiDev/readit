import React from 'react'
import SmileyFaceIco from './icons/SmileyFaceIco'
import { AuthBtn } from './buttons/AuthBtn'

export default function SideNav() {
  return (
    <div className="md:fixed flex flex-col md:h-screen p-2 nav-gradient">
      {/* Logo */}
      <div className=" bg-blue-500 rounded-md shadow-md">
        <div className="w-10 h-10 md:w-48 md:h-48 m-4 flex justify-center items-center">
          <SmileyFaceIco />
        </div>
      </div>

      {/* Navigation Buttons */}
      <nav className="flex items-center w-full md:h-full md:flex-col mt-2">
        <div className="flex md:flex-col w-full md:h-full md:space-y-2">
          <div className="flex flex-col p-2 rounded-md bg-white shadow-md">
            <p className="pl-2 pb-2">Posts:</p>
            <div className="flex flex-col">
              <a href="/posts" className="nav-sub-button pl-4 rounded-t-lg">
                Recent
              </a>
              <div className="separator h-[2px] bg-gray-100"></div>
              <a href="/posts" className="nav-sub-button pl-4">
                Followed
              </a>
              <div className="separator h-[2px] bg-gray-100"></div>
              <a href="/my-posts" className="nav-sub-button pl-4 rounded-b-lg">
                My posts
              </a>
            </div>
          </div>

          <a href="/profile" className="nav-button pl-4">
            My profile
          </a>
          <a href="/" className="nav-button pl-4">
            About
          </a>
          <a href="/credits" className="nav-button pl-4">
            Credits
          </a>
          <div className="bg-white h-auto rounded-md grow shadow-md"></div>
        </div>
        <AuthBtn />
      </nav>
    </div>
  )
}
