'use client'

import { useCommentContext } from '@/lib/context/CommentContextProvider'
import { ReplyIco } from '../icons/ReplyIco'
import { signIn, useSession } from 'next-auth/react'
import { usePostContext } from '@/lib/context/PostContextProvider'

export function ReplyBtn() {
  const { data: session } = useSession()
  const { setTriggerRebuild } = usePostContext()
  const { isReplyFormVis, setIsReplyFormVis } = useCommentContext()

  function handleClick() {
    session ? setIsReplyFormVis(!isReplyFormVis) : signIn()
    setTriggerRebuild((counter) => counter + 1)
  }
  return (
    <button
      className="comment-reply-btn flex justify-center items-center ml-[3px] h-11 px-2 rounded-md interactive-blue-soft"
      aria-label="Open comment reply form"
      aria-expanded={isReplyFormVis}
      type="button"
      onClick={handleClick}
    >
      <div className="comment-reply-btn-icon w-[22px] mt-[2px]">
        <ReplyIco className="text-app-blue-text" />
      </div>
      <p className="btn-text below-xs:hidden ml-[6px] font-semibold">Reply</p>
    </button>
  )
}
