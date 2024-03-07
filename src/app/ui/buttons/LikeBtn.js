'use client'

import { handleLikeClick } from '@/app/lib/actions'
import { LikeIco } from '../icons/LikeIco'
import { LikeIcoActive } from '../icons/LikeIcoActive'
import { useCommentContext } from '@/app/lib/context/CommentContextProvider'
import { usePostContext } from '@/app/lib/context/PostContextProvider'
import { toast } from 'sonner'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { LoaderTiny } from '../LoaderTiny'

export function LikeBtn({ styles, collection }) {
  const { commentId, commentLikes } =
    collection === 'comments' ? useCommentContext() : { undefined, undefined }
  const { comments, setComments, post, setPost, postId, postLikes } =
    usePostContext()
  const [response, setResponse] = useState({ state: null, message: null })
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
    if (!session) return
    const newPost = { ...post }

    if (!post.likes) {
      newPost.likes = [userId]
    } else if (!post.likes.includes(userId)) {
      newPost.likes = [...post.likes, userId]
    } else {
      newPost.likes = post.likes.filter((like) => like !== userId)
    }

    setPost(newPost)
  }

  function handleCommentOptimistically() {
    if (!session) return
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
    // const { pending } = useFormStatus()

    return (
      <button
        className={styles + ' flex justify-center items-center'}
        type="submit"
        onClick={onClick}
      >
        {isAlreadyLiked ? <LikeIcoActive /> : <LikeIco />}
        {/* {pending && <LoaderTiny />} */}
      </button>
    )
  }

  return (
    <form className="rounded-md  hover:bg-gray-200">
      <SubmitButton />
    </form>
  )
}
