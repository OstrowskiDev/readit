'use client'

import { usePostContext } from '@/app/lib/context/PostContextProvider'
import { EditIco } from '../icons/EditIco'
import { usePathname, useRouter } from 'next/navigation'

export function EditPostBtn({ postId }) {
  const { setIsEditFormVisible } = usePostContext()
  const pathname = usePathname()
  const router = useRouter()

  function onClick() {
    if (pathname === `/posts/post/${postId}`) {
      setIsEditFormVisible((prevValue) => !prevValue)
    } else {
      // !!!! add search params that will open edit form
      router.push(`/posts/post/${postId}`)
    }
  }
  return (
    <button
      onClick={onClick}
      className="w-10 mb-[1px] p-2 flex justify-center items-center rounded-md hover:bg-gray-200 "
    >
      <EditIco />
    </button>
  )
}
