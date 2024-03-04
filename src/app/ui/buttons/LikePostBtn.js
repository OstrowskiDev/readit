'use client'

import { handleLikeClick } from '@/app/lib/actions'
import { LikeIco } from '../icons/LikeIco'
import { LikeIcoActive } from '../icons/LikeIcoActive'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import { useFormState, useFormStatus } from 'react-dom'
import { useEffect } from 'react'
import { Loader } from '../Loader'

export function LikePostBtn({ postId, postLikes }) {
  const { data: session } = useSession()
  const userId = session?.user?.id
  const isAlreadyLiked = postLikes?.includes(userId)

  const collection = 'posts'
  const handleLikeWithId = handleLikeClick.bind(null, postId, postId, collection)
  const [submition, formAction] = useFormState(handleLikeWithId, {
    state: null,
    message: null,
  })

  useEffect(() => {
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
      <button className="w-11 h-10 px-[10px] flex justify-center items-center">
        {isAlreadyLiked ? <LikeIcoActive /> : <LikeIco />}
        {pending && <Loader />}
      </button>
    )
  }

  return (
    <form action={formAction} className="rounded-md hover:bg-gray-300">
      <SubmitButton />
    </form>
  )
}
