'use client'

import { useState } from 'react'
import { AuthBtn } from '../buttons/AuthBtn'
import { MobileAvatar } from '../mobile/MobileAvatar'
import { MobileCollapseMenu } from '../mobile/MobileCollapseMenu'
import { MobileLogo } from '../mobile/MobileLogo'
import { MobileMenu } from '../mobile/MobileMenu'
import { MobileSignIn } from '../mobile/MobileSignIn'
import { DesktopLogo } from './DesktopLogo'
import { NavbarPosts } from './NavbarPosts'

export default function NavigationLayout() {
  const [toggleCollapse, setToggleCollapse] = useState(false)

  return (
    <>
      {/* Mobile layout: */}
      <div className="mobile-layout-top lg:hidden h-[72px] w-full mb-6 below-md:mb-4"></div>
      <div className="mobile-layout lg:hidden glass-blue-soft rounded-none border-x-0 fixed flex flex-col top-0 left-0 w-full z-50">
        <div className="mobile-navigation max-w-[800px] w-full mx-auto px-2 below-lg:flex lg:rounded-md shadow-md">
          <MobileMenu setToggleCollapse={setToggleCollapse} />
          <MobileLogo />
          <div className="mobile-separator lg:hidden ml-auto"></div>
          <MobileAvatar />
          <MobileSignIn />
        </div>
        {toggleCollapse && <MobileCollapseMenu />}
      </div>

      {/* Desktop layout: */}
      <div className="desktop-layout below-lg:hidden fixed flex flex-col h-screen p-2">
        <DesktopLogo />
        {/* Desktop navigation: */}
        <nav className="desktop-navigation-container flex below-lg:hidden items-center w-full h-full flex-col mt-2">
          <div className="desktop-navigation-anchors flex lg:flex-col w-full h-full space-y-2">
            <NavbarPosts />
            <a
              href="/my-profile"
              className="nav-button glass-blue-soft interactive-orange-strong btn-orbitron pl-4"
            >
              My profile
            </a>
            <a
              href="/posts/post/about"
              className="nav-button glass-blue-soft interactive-orange-strong btn-orbitron pl-4"
            >
              About
            </a>
            <a
              href="/posts/post/credits"
              className="nav-button glass-blue-soft interactive-orange-strong btn-orbitron pl-4"
            >
              Credits
            </a>
            <div className="h-auto rounded-md grow shadow-md"></div>
          </div>
          <AuthBtn />
        </nav>
      </div>
    </>
  )
}
