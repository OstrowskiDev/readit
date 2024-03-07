'use client'

import { useSession } from 'next-auth/react'
import { handleDislikeClick } from '@/app/lib/actions'
import { DislikeIco } from '../icons/DislikeIco'
import { DislikeIcoActive } from '../icons/DislikeIcoActive'
import { useCommentContext } from '@/app/lib/context/CommentContextProvider'
import { toast } from 'sonner'
import { useFormState, useFormStatus } from 'react-dom'
import { useEffect } from 'react'
import { Loader } from '../Loader'

export function DislikeBtn() {
  const { commentId, postId, commentDislikes } = useCommentContext()
  const { data: session } = useSession()
  const userId = session?.user?.id
  const isAlreadyDisliked = commentDislikes?.includes(userId)

  const collection = 'comments'
  const handleDislikeWithId = handleDislikeClick.bind(null, commentId, postId, collection)
  const [response, formAction] = useFormState(handleDislikeWithId, {
    state: null,
    message: null,
  })

  useEffect(() => {
    if (response.state === 'success') {
      toast.success(response.message)
    }
    if (response.state === 'error') {
      toast.error(response.message)
    }
  }, [response])

  function SubmitButton() {
    const { pending } = useFormStatus()

    return (
      <button className="w-11 h-11 px-[10px] pt-[9px] pb-[7px] flex justify-center items-center">
        {isAlreadyDisliked ? <DislikeIcoActive /> : <DislikeIco />}
        {pending && <Loader />}
      </button>
    )
  }

  return (
    <form action={formAction} className="ml-[1px] rounded-md hover:bg-gray-200">
      <SubmitButton />
    </form>
  )
}
