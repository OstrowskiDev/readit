'use client'

import { useState } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { CommentOptMenu } from '../comment/CommentOptMenu'
import { DotsIco } from '../icons/DotsIco'

export function CommentMenuBtn() {
  const [isMenuVisible, setIsMenuVisible] = useState(false)
  const { data: session } = useSession()

  function handleClick(event) {
    event.preventDefault()
    if (!session) return signIn()
    setIsMenuVisible(true)
    document.addEventListener('click', handleDocumentClick)
  }

  function handleDocumentClick(event) {
    event.preventDefault()
    if (!event.target.closest('.menu-btn-container')) {
      setIsMenuVisible(false)
      document.removeEventListener('click', handleDocumentClick)
    }
  }

  return (
    <div className="comment-menu-btn-container relative">
      <button
        className="comment-menu-btn interactive-blue-soft h-11 py-[7px] px-3 mt-[1px] rounded-md"
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
