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
import { usePostContext } from '@/app/lib/context/PostContextProvider'

export function LikeBtn() {
  const { commentId, postId, commentLikes } = useCommentContext()
  const { comments, setComments } = usePostContext()
  const { data: session } = useSession()
  const userId = session?.user?.id
  const isAlreadyLiked = commentLikes?.includes(userId)

  const collection = 'comments'
  const [response, formAction] = useFormState(
    async () => {
      handleLikeOptimistially()
      const serverResponse = await handleLikeClick(commentId, postId, collection)
      return serverResponse
    },
    {
      state: null,
      message: null,
    }
  )

  useEffect(() => {
    if (response?.state === 'success') {
      toast.success(response.message)
    }
    if (response?.state === 'error') {
      toast.error(response.message)
    }
  }, [response])

  function handleLikeOptimistially() {
    if (!session) return
    const newComments = [...comments]
    const oldComment = comments.find((comment) => comment._id === commentId)
    const newComment = { ...oldComment }
    console.log(oldComment)

    if (!oldComment.likes) {
      newComment.likes = [userId]
    } else if (!oldComment.likes.includes(userId)) {
      newComment.likes = [...oldComment.likes, userId]
    } else {
      newComment.likes = oldComment.likes.filter((like) => like !== userId)
    }

    const index = newComments.findIndex((comment) => comment._id === commentId)
    if (index !== -1) {
      newComments[index] = newComment
    }
    console.log(newComment)
    setComments(newComments)
  }

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
