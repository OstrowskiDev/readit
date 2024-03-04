'use client'

import { handleLikeClick } from '@/app/lib/actions'
import { LikeIco } from '../icons/LikeIco'
import { LikeIcoActive } from '../icons/LikeIcoActive'
import { useCommentContext } from '@/app/lib/context/CommentContextProvider'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import { useFormState, useFormStatus } from 'react-dom'
import { useEffect } from 'react'
import { Loader } from '../Loader'

export function LikeBtn() {
  const { commentId, postId, commentLikes } = useCommentContext()
  const { data: session } = useSession()
  const userId = session?.user?.id
  const isAlreadyLiked = commentLikes?.includes(userId)

  const collection = 'comments'
  const handleLikeWithId = handleLikeClick.bind(null, commentId, postId, collection)
  const [submition, formAction] = useFormState(handleLikeWithId, {
    state: null,
    message: null,
  })

  useEffect(() => {
    console.log('like button submition triggered')
    if (submition.state === 'success') {
      toast.success(submition.message)
    }
    if (submition.state === 'error') {
      toast.error(submition.message)
    }
  }, [submition])

  function SubmitButton() {
    const { pending } = useFormStatus()

    return (
      <button className="w-11 h-11 px-[10px] py-2 flex justify-center items-center" type="submit">
        {isAlreadyLiked ? <LikeIcoActive /> : <LikeIco />}
        {pending && <Loader />}
      </button>
    )
  }

  return (
    <form action={formAction} className="rounded-md  hover:bg-gray-200">
      <SubmitButton />
    </form>
  )
}
