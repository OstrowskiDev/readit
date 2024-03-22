'use client'

import { handleLikeClick } from '@/app/lib/actions'
import { LikeIco } from '../icons/LikeIco'
import { LikeIcoActive } from '../icons/LikeIcoActive'
import { useCommentContext } from '@/app/lib/context/CommentContextProvider'
import { usePostContext } from '@/app/lib/context/PostContextProvider'
import { toast } from 'sonner'
import { signIn, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export function LikeBtn({ styles, collection }) {
  const { commentId, commentLikes } =
    collection === 'comments' ? useCommentContext() : { undefined, undefined }
  const { comments, setComments, post, setPost, postId, postLikes } =
    usePostContext()
  const [response, setResponse] = useState({
    state: null,
    message: null,
    wasDisliked: false,
  })
  const { data: session } = useSession()
  const userId = session?.user?.id
  const isAlreadyLiked =
    collection === 'posts'
      ? postLikes?.includes(userId)
      : commentLikes?.includes(userId)

  useEffect(() => {
    if (response?.state === 'success') {
      toast.success(response.message)
    }
    if (response?.state === 'error') {
      toast.error(response.message)
      handleOptimisticError()
    }
  }, [response])

  async function onClick() {
    if (!session) return signIn()

    collection === 'posts'
      ? handlePostOptimistically()
      : handleCommentOptimistically()

    const serverResponse =
      collection === 'posts'
        ? await handleLikeClick(postId, postId, collection)
        : await handleLikeClick(commentId, postId, collection)

    setResponse(serverResponse)
  }

  function handlePostOptimistically() {
    const newPost = { ...post }

    if (!post.likes) {
      newPost.likes = [userId]
    } else if (!post.likes.includes(userId)) {
      newPost.likes = [...post.likes, userId]
    } else {
      newPost.likes = post.likes.filter((id) => id !== userId)
    }

    if (post.dislikes?.includes(userId)) {
      newPost.dislikes = post.dislikes.filter((id) => id !== userId)
    }

    if (response?.state === 'error' && response?.wasDisliked === true) {
      newPost.dislikes = [...newPost.dislikes, userId]
    }

    setPost(newPost)
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

  function handleOptimisticError() {
    collection === 'posts'
      ? handlePostOptimistically()
      : handleCommentOptimistically()
  }

  function SubmitButton() {
    return (
      <button
        className={styles + ' flex justify-center items-center'}
        type="submit"
        onClick={onClick}
      >
        {isAlreadyLiked ? <LikeIcoActive /> : <LikeIco />}
      </button>
    )
  }

  return (
    <form
      className={
        'rounded-md ' +
        (collection === 'comments' ? 'hover:bg-gray-200' : 'hover:bg-gray-300')
      }
    >
      <SubmitButton />
    </form>
  )
}
