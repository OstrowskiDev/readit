'use client'

import { handleDislikeClick } from '@/app/lib/actions/likes'
import { useCommentContext } from '@/app/lib/context/CommentContextProvider'
import { useToastContext } from '@/app/lib/toasts/ToastProvider'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { DislikeIco } from '../icons/DislikeIco'
import { DislikeIcoActive } from '../icons/DislikeIcoActive'

export function CommentDislikeBtn({ styles }) {
  const { comment, commentId, comments, setComments } = useCommentContext()
  const [response, setResponse] = useState({
    state: null,
    message: null,
    wasLiked: false,
  })
  const { data: session } = useSession()
  const { toastFunctions: toast } = useToastContext()
  const userId = session?.user?.id
  const isAlreadyDisliked = comment.dislikes?.includes(userId)
  const collection = 'comments'

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
    handleCommentOptimistically()
    const serverResponse = await handleDislikeClick(commentId, collection)
    setResponse(serverResponse)
  }

  function handleCommentOptimistically() {
    if (!session) return
    const newComments = [...comments]
    const oldComment = comments.find((comment) => comment._id === commentId)
    const newComment = { ...oldComment }

    if (!oldComment.dislikes) {
      newComment.dislikes = [userId]
    } else if (!oldComment.dislikes.includes(userId)) {
      newComment.dislikes = [...oldComment.dislikes, userId]
    } else {
      newComment.dislikes = oldComment.dislikes.filter((id) => id !== userId)
    }

    if (oldComment.likes?.includes(userId)) {
      newComment.likes = oldComment.likes.filter((id) => id !== userId)
    }

    if (response?.state === 'error' && response?.wasLiked === true) {
      newComment.likes = [...newComment.likes, userId]
    }

    const index = newComments.findIndex((comment) => comment._id === commentId)
    if (index !== -1) {
      newComments[index] = newComment
    }
    setComments(newComments)
  }

  return (
    <form className="comment-dislike-btn-container ml-[1px] rounded-md hover:bg-gray-200 ">
      <button
        className={
          'comment-dislike-btn ' + styles + ' flex justify-center items-center'
        }
        type="submit"
        onClick={onClick}
      >
        {isAlreadyDisliked ? <DislikeIcoActive /> : <DislikeIco />}
      </button>
    </form>
  )
}
