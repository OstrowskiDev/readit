'use client'

import { handleCommentLike } from '@/app/lib/actions/likes'
import { LikeIco } from '../icons/LikeIco'
import { LikeIcoActive } from '../icons/LikeIcoActive'
import { useCommentContext } from '@/app/lib/context/CommentContextProvider'
import { signIn, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useToastContext } from '@/app/lib/toasts/ToastProvider'

export function CommentLikeBtn({ styles }) {
  const { commentId, comment, comments, setComments } = useCommentContext()
  const [response, setResponse] = useState({
    state: null,
    message: null,
    wasDisliked: false,
  })
  const { toastFunctions: toast } = useToastContext()
  const { data: session } = useSession()
  const userId = session?.user?.id
  const isAlreadyLiked = comment.likes?.includes(userId)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (response?.state === 'success') {
      toast.success(response.message)
    }
    if (response?.state === 'error') {
      toast.error(response.message)
      handleCommentOptimistically()
    }
  }, [response])

  async function onClick(event) {
    event.preventDefault()
    if (!session) return signIn()
    handleCommentOptimistically()
    const serverResponse = await handleCommentLike(commentId, 'like')
    setResponse(serverResponse)
  }

  function handleCommentOptimistically() {
    const newComments = [...comments]
    const oldComment = comments.find((comment) => comment._id === commentId)
    const newComment = { ...oldComment }

    if (!oldComment.likes) {
      newComment.likes = [userId]
    } else if (!oldComment.likes.includes(userId)) {
      newComment.likes = [...oldComment.likes, userId]
    } else {
      newComment.likes = oldComment.likes.filter((like) => like !== userId)
    }

    if (oldComment.dislikes?.includes(userId)) {
      newComment.dislikes = oldComment.dislikes.filter((id) => id !== userId)
    }

    if (response?.state === 'error' && response?.wasDisliked === true) {
      newComment.dislikes = [...newComment.dislikes, userId]
    }

    const index = newComments.findIndex((comment) => comment._id === commentId)
    if (index !== -1) {
      newComments[index] = newComment
    }
    setComments(newComments)
  }

  return (
    <form className="comment-like-btn-container rounded-md hover:bg-gray-200">
      <button
        className={
          'comment-like-btn ' + styles + ' flex justify-center items-center'
        }
        type="submit"
        onClick={onClick}
      >
        {isAlreadyLiked ? <LikeIcoActive /> : <LikeIco />}
      </button>
    </form>
  )
}
