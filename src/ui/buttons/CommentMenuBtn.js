'use client'

import { useRef, useState } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { CommentOptMenu } from '../comment/CommentOptMenu'
import { DotsIco } from '../icons/DotsIco'

export function CommentMenuBtn() {
  const [isMenuVisible, setIsMenuVisible] = useState(false)
  const { data: session } = useSession()
  const buttonRef = useRef(null)

  function handleClick() {
    if (!session) return signIn()
    if (isMenuVisible) {
      setIsMenuVisible(false)
      document.removeEventListener('click', handleDocumentClick)
    } else {
      setIsMenuVisible(true)
      document.addEventListener('click', handleDocumentClick)
    }
  }

  function handleDocumentClick(event) {
    // ignores click on button that opens menu
    if (buttonRef.current && buttonRef.current.contains(event.target)) {
      return
    }

    if (!event.target.closest('.menu-btn-container')) {
      setIsMenuVisible(false)
      document.removeEventListener('click', handleDocumentClick)
    }
  }

  return (
    <div className="comment-menu-btn-container relative">
      <button
        ref={buttonRef}
        className="comment-menu-btn interactive-blue-soft h-11 py-[7px] px-3 mt-[1px] rounded-md"
        aria-label="Open comment menu"
        type="button"
        onClick={handleClick}
      >
        <div className="comment-menu-btn-icon w-[22px] flex justify-center items-center">
          <DotsIco className={'text-app-blue-text'} />
        </div>
      </button>
      <CommentOptMenu
        isMenuVisible={isMenuVisible}
        setIsMenuVisible={setIsMenuVisible}
      />
    </div>
  )
}
