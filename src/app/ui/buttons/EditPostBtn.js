'use client'

import { EditIco } from '../icons/EditIco'
import { useRouter } from 'next/navigation'

export function EditPostBtn({ postId }) {
  const router = useRouter()
  function onClick() {
    router.push(`/posts/edit/${postId}`)
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
