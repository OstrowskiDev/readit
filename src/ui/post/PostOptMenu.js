'use client'

import { usePostContext } from '@/lib/context/PostContextProvider'
import { useToastContext } from '@/lib/toasts/ToastProvider'
import { FavoritesBtn } from '@/ui/buttons/FavoritesBtn'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export function PostOptMenu({ isPostMenuVis, setIsPostMenuVis }) {
  const { data: session } = useSession()
  const { postId } = usePostContext()
  const { toastFunctions: toast } = useToastContext()

  const [response, setResponse] = useState({
    state: null,
    message: null,
  })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (response?.state === 'success') {
      toast.success(response.message)
    }
    if (response?.state === 'error') {
      toast.error(response.message)
      handleOptimisticallyDeleteError()
    }
  }, [response])

  return (
    <>
      {isPostMenuVis && (
        <div
          className={`menu-container flex flex-col absolute z-10 top-10 right-0  bg-white border border-gray-300 rounded-md`}
        >
          {session && (
            <FavoritesBtn
              type={'post'}
              documentId={postId}
              setIsPostMenuVis={setIsPostMenuVis}
              setResponse={setResponse}
            />
          )}
        </div>
      )}
    </>
  )
}
