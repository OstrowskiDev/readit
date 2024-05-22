'use client'

import { handleLikeClick } from '@/app/lib/actions'
import { LikeIco } from '../icons/LikeIco'
import { LikeIcoActive } from '../icons/LikeIcoActive'
import { useCommentContext } from '@/app/lib/context/CommentContextProvider'
import { usePostContext } from '@/app/lib/context/PostContextProvider'
import { signIn, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useToastContext } from '@/app/lib/toasts/ToastProvider'

export function LikeBtn({ styles, collection }) {
  const { commentId, comment } =
    collection === 'comments' ? useCommentContext() : { undefined, undefined }
  const { comments, setComments, post, setPost, setPosts, postId, postLikes } =
    usePostContext()
  const [response, setResponse] = useState({
    state: null,
    message: null,
    wasDisliked: false,
  })
  const pathname = usePathname()
  const { toastFunctions: toast } = useToastContext()
  const { data: session } = useSession()
  const userId = session?.user?.id
  const isAlreadyLiked =
    collection === 'posts'
      ? postLikes?.includes(userId)
      : comment.likes?.includes(userId)

  useEffect(() => {
    if (response?.state === 'success') {
      toast.success(response.message)
    }
    if (response?.state === 'error') {
      toast.error(response.message)
      handleOptimisticError()
    }
  }, [response])

  async function onClick(event) {
    event.preventDefault()
    if (!session) return signIn()

    collection === 'posts'
      ? handlePostOptimistically()
      : handleCommentOptimistically()

    const serverResponse =
      collection === 'posts'
        ? await handleLikeClick(postId, collection)
        : await handleLikeClick(commentId, collection)

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

    if (pathname.startsWith('/posts/post')) {
      setPost(newPost)
    } else {
      setPosts((prevPosts) =>
        prevPosts.map((p) => (p._id === newPost._id ? newPost : p)),
      )
    }
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
