import { usePostContext } from '@/app/lib/context/PostContextProvider'
import { useToastContext } from '@/app/lib/toasts/ToastProvider'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { deletePost } from '../../lib/actions/post'
import DeleteIco from '../icons/DeleteIco'

export function DeletePostBtn({ postId }) {
  const { setDeleted } = usePostContext()
  const { toastFunctions: toast } = useToastContext()
  const [response, setResponse] = useState({
    state: null,
    message: null,
  })
  const router = useRouter()
  const pathname = usePathname()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (response?.state === 'success') {
      toast.success(response.message)
    }
    if (response?.state === 'error') {
      toast.error(response.message)
      handleErrorOptimistically()
    }
  }, [response])

  function optimisticUpdate() {
    setDeleted(true)
  }

  function handleErrorOptimistically() {
    setDeleted(false)
  }

  async function onClick(event) {
    event.preventDefault()
    optimisticUpdate()
    const response = await deletePost(postId)
    setResponse(response)
    if (pathname === `/posts/post/${postId}`) {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      router.push('/posts')
    }
  }
  return (
    <div className="delete-post-btn">
      <button
        className="w-[38px] p-2 flex justify-center items-center rounded-md hover:bg-gray-200"
        type="submit"
        onClick={onClick}
      >
        <DeleteIco />
      </button>
    </div>
  )
}
