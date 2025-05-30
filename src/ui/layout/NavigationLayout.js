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
      <div className="mobile-layout-top md:hidden h-[72px] w-full "></div>
      <div className="mobile-layout md:hidden fixed flex flex-col top-0 left-0 w-full z-50">
        <div className="mobile-navigation bg-blue-500 below-md:flex md:rounded-md shadow-md">
          <MobileMenu setToggleCollapse={setToggleCollapse} />
          <MobileLogo />
          <div className="mobile-separator md:hidden ml-auto"></div>
          <MobileAvatar />
          <MobileSignIn />
        </div>
        {toggleCollapse && <MobileCollapseMenu />}
      </div>

      {/* Desktop layout: */}
      <div className="desktop-layout below-md:hidden fixed flex flex-col h-screen p-2">
        <DesktopLogo />
        {/* Desktop navigation: */}
        <nav className="desktop-navigation-container flex below-md:hidden items-center w-full h-full flex-col mt-2">
          <div className="desktop-navigation-anchors flex md:flex-col w-full h-full space-y-2">
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
