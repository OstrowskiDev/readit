'use client'

import { useState } from 'react'
import { DotsIco } from '../icons/DotsIco'
import { CommentOptMenu } from '../CommentOptMenu'

export function CommentMenuBtn() {
  const [isMenuVisible, setIsMenuVisible] = useState(false)

  function handleClick() {
    setIsMenuVisible(true)
    document.addEventListener('click', handleDocumentClick)
  }

  function handleDocumentClick(e) {
    if (!e.target.closest('.menu-btn')) {
      setIsMenuVisible(false)
      document.removeEventListener('click', handleDocumentClick)
    }
  }

  return (
    <div className="menu-btn relative">
      <button
        className=" mt-[3px] py-[7px] px-3 rounded-md hover:bg-gray-200"
        type="button"
        onClick={handleClick}
      >
        <div className="menu-btn-icc-container w-[22px] flex justify-center items-center">
          <DotsIco />
        </div>
      </button>
      {isMenuVisible && (
        <CommentOptMenu isMenuVisible={isMenuVisible} setIsMenuVisible={setIsMenuVisible} />
      )}
    </div>
  )
}
