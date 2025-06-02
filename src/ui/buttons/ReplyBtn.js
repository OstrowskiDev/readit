'use client'

import { useCommentContext } from '@/lib/context/CommentContextProvider'
import { ReplyIco } from '../icons/ReplyIco'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { usePostContext } from '@/lib/context/PostContextProvider'

export function ReplyBtn() {
  const router = useRouter()
  const pathname = usePathname()
  const { data: session } = useSession()
  const { setTriggerRebuild } = usePostContext()
  const { comment, isReplyFormVis, setIsReplyFormVis } = useCommentContext()

  function handleClick(event) {
    event.preventDefault()
    if (pathname === '/posts/favorites') {
      const href = `/posts/post/${comment.rootPostId}?showReplyForm=true#${comment._id}`
      router.push(href)
      return
    }
    session ? setIsReplyFormVis(!isReplyFormVis) : signIn()
    setTriggerRebuild((counter) => counter + 1)
  }
  return (
    <button
      className="comment-reply-btn flex justify-center items-center ml-[3px] h-11 px-2 rounded-md interactive-blue-soft"
      onClick={handleClick}
    >
      <div className="comment-reply-btn-icon w-[22px] mt-[2px]">
        <ReplyIco className="text-app-lightblue-400" />
      </div>
      <p className="btn-text below-xs:hidden ml-[6px] font-semibold">Reply</p>
    </button>
  )
}
