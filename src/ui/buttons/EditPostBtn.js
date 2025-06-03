'use client'

import { usePostContext } from '@/lib/context/PostContextProvider'
import { EditIco } from '../icons/EditIco'
import { usePathname, useRouter } from 'next/navigation'

export function EditPostBtn({ postId }) {
  const { setIsEditFormVisible } = usePostContext()
  const pathname = usePathname()
  const router = useRouter()

  function onClick(e) {
    if (pathname === `/posts/post/${postId}`) {
      setIsEditFormVisible((prevValue) => !prevValue)
    } else {
      e.preventDefault()
      router.push(`/posts/post/${postId}?editPost=true`)
    }
  }
  return (
    <div className="edit-post-btn-container mt-[1px]">
      <button
        onClick={onClick}
        className="edit-post-btn interactive-blue-soft w-10 p-2 flex justify-center items-center rounded-md"
      >
        <EditIco className={'text-app-blue-text'} />
      </button>
    </div>
  )
}
