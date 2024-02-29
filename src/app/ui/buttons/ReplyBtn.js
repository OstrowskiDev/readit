'use client'

import { useCommentContext } from '@/app/lib/context/CommentContextProvider'
import { ReplyIco } from '../icons/ReplyIco'
import { signIn, useSession } from 'next-auth/react'

export function ReplyBtn() {
  const { data: session } = useSession()
  const { isVisible, setIsVisible } = useCommentContext()

  function handleClick() {
    session ? setIsVisible(!isVisible) : signIn()
  }
  return (
    <button
      className="btn-container flex justify-center items-center ml-[3px] h-11 px-2 rounded-md hover:bg-gray-200"
      onClick={handleClick}
    >
      <div className="btn-icon w-[22px]">
        <ReplyIco />
      </div>
      <p className="btn-text ml-1 font-semibold text-gray-500">Reply</p>
    </button>
  )
}
