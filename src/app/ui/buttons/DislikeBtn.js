'use client'

import { handleDislikeClick } from '@/app/lib/actions'
import { DislikeIco } from '../icons/DislikeIco'
import { DislikeIcoActive } from '../icons/DislikeIcoActive'
import { useCommentContext } from '@/app/lib/context/CommentContextProvider'
import { usePostContext } from '@/app/lib/context/PostContextProvider'
import { useSession } from 'next-auth/react'
import { useContext, useEffect, useState } from 'react'
import { ToastContext } from '@/app/lib/toasts/ToastContext'
import { usePathname } from 'next/navigation'

export function DislikeBtn({ styles, collection }) {
  const { comment, commentId } =
    collection === 'comments' ? useCommentContext() : { undefined, undefined }
  const {
    comments,
    setComments,
    post,
    setPost,
    setPosts,
    postId,
    postDislikes,
  } = usePostContext()
  const [response, setResponse] = useState({
    state: null,
    message: null,
    wasLiked: false,
  })
  const pathname = usePathname()
  const { data: session } = useSession()
  const toast = useContext(ToastContext)
  const userId = session?.user?.id
  const isAlreadyDisliked =
    collection === 'posts'
      ? postDislikes?.includes(userId)
      : comment.dislikes?.includes(userId)

  useEffect(() => {
    if (response.state === 'success') {
      toast.success(response.message)
    }
    if (response.state === 'error') {
      toast.error(response.message)
      handleOptimisticError()
    }
  }, [response])

  async function onClick(event) {
    event.preventDefault()

    collection === 'posts'
      ? handlePostOptimistically()
      : handleCommentOptimistically()

    const serverResponse =
      collection === 'posts'
        ? await handleDislikeClick(postId, postId, collection)
        : await handleDislikeClick(commentId, postId, collection)

    setResponse(serverResponse)
  }

  function handlePostOptimistically() {
    if (!session) return
    const newPost = { ...post }

    if (!post.dislikes) {
      newPost.dislikes = [userId]
    } else if (!post.dislikes.includes(userId)) {
      newPost.dislikes = [...post.dislikes, userId]
    } else {
      newPost.dislikes = post.dislikes.filter((id) => id !== userId)
    }

    if (post.likes?.includes(userId)) {
      newPost.likes = post.likes.filter((id) => id !== userId)
    }

    if (response?.state === 'error' && response?.wasLiked === true) {
      newPost.likes = [...newPost.likes, userId]
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
        {isAlreadyDisliked ? <DislikeIcoActive /> : <DislikeIco />}
      </button>
    )
  }

  return (
    <form
      className={
        'ml-[1px] rounded-md ' +
        (collection === 'comments' ? 'hover:bg-gray-200' : 'hover:bg-gray-300')
      }
    >
      <SubmitButton />
    </form>
  )
}
