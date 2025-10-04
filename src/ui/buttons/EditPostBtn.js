'use client'

import { usePostContext } from '@/lib/context/PostContextProvider'
import { EditIco } from '../icons/EditIco'
import { usePathname, useRouter } from 'next/navigation'

export function EditPostBtn({ postId }) {
  const { isEditFormVisible, setIsEditFormVisible } = usePostContext()
  const pathname = usePathname()
  const router = useRouter()
  const userOnPostPage = pathname === `/posts/post/${postId}`

  function onClick() {
    if (userOnPostPage) {
      if (!isEditFormVisible) {
        const formPosition = document.querySelector('.post-bottom-container')
        formPosition.scrollIntoView({ behavior: 'smooth' })
      }
      setIsEditFormVisible((prevValue) => !prevValue)
    } else {
      router.push(`/posts/post/${postId}?editPost=true`)
    }
  }

  const ariaProps = userOnPostPage
    ? {
        'aria-expanded': isEditFormVisible,
        'aria-label': 'Open edit post form',
      }
    : { 'aria-label': 'Navigate to edit post form' }

  return (
    <div className="edit-post-btn-container mt-[1px]">
      <button
        onClick={onClick}
        {...ariaProps}
        type="button"
        className="edit-post-btn interactive-blue-soft w-10 p-2 flex justify-center items-center rounded-md"
      >
        <EditIco className={'text-app-blue-text'} />
      </button>
    </div>
  )
}
