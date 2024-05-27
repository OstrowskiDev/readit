import DeleteIco from '../icons/DeleteIco'
import { deletePost } from '../../lib/actions'
import { usePostContext } from '@/app/lib/context/PostContextProvider'
import { useEffect, useState } from 'react'
import { useToastContext } from '@/app/lib/toasts/ToastProvider'

export function DeletePostBtn({ postId }) {
  const { setDeleted } = usePostContext()
  const { toastFunctions: toast } = useToastContext()
  const [response, setResponse] = useState({
    state: null,
    message: null,
  })

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
  }
  return (
    <form>
      <button
        className="w-[38px] p-2 flex justify-center items-center rounded-md hover:bg-gray-200"
        type="submit"
        onClick={onClick}
      >
        <DeleteIco />
      </button>
    </form>
  )
}
