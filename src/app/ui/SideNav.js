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
          <a href="/" className="nav-button pl-4">
            Home
          </a>
          <a href="/posts" className="nav-button pl-4">
            Posts
          </a>
          <a href="/my-profile" className="nav-button pl-4">
            My Profile
          </a>
          <a href="/my-posts" className="nav-button pl-4">
            My Posts
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
