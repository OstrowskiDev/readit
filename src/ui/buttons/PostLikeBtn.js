'use client'

import { handlePostLike } from '@/lib/actions/likes'
import { usePostContext } from '@/lib/context/PostContextProvider'
import { useToastContext } from '@/lib/toasts/ToastProvider'
import { signIn, useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { LikeIco } from '../icons/LikeIco'
import { LikeIcoActive } from '../icons/LikeIcoActive'

export function PostLikeBtn({ styles }) {
  const { post, setPost, setPosts, postId, postLikes } = usePostContext()
  const [response, setResponse] = useState({
    state: null,
    message: null,
    wasDisliked: false,
  })
  const pathname = usePathname()
  const { toastFunctions: toast } = useToastContext()
  const { data: session } = useSession()

  const userId = session?.user?.id
  const isAlreadyLiked = postLikes?.includes(userId)

  useEffect(() => {
    if (response?.state === 'success') {
      toast.success(response.message)
    }
    if (response?.state === 'error') {
      toast.error(response.message)
      handlePostOptimistically()
    }
  }, [response])

  async function onClick(event) {
    event.preventDefault()
    if (!session) return signIn()
    handlePostOptimistically()
    const serverResponse = await handlePostLike(postId, 'like')
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

  return (
    <form className="post-like-button relative interactive-orange-strong rounded-xl border border-app-blue/0 z-20">
      <button
        className={styles + ' flex justify-center items-center'}
        type="submit"
        onClick={onClick}
      >
        {isAlreadyLiked ? (
          <LikeIcoActive className={'text-app-strongorange-500'} />
        ) : (
          <LikeIco className={'text-app-blue-text'} />
        )}
      </button>
    </form>
  )
}
