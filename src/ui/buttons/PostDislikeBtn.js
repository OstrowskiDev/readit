'use client'

import { handlePostLike } from '@/lib/actions/likes'
import { usePostContext } from '@/lib/context/PostContextProvider'
import { useToastContext } from '@/lib/toasts/ToastProvider'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { DislikeIco } from '../icons/DislikeIco'
import { DislikeIcoActive } from '../icons/DislikeIcoActive'

export function PostDislikeBtn({ styles }) {
  const { post, setPost, setPosts, postId, postDislikes } = usePostContext()
  const [response, setResponse] = useState({
    state: null,
    message: null,
    wasLiked: false,
  })
  const pathname = usePathname()
  const { data: session } = useSession()
  const { toastFunctions: toast } = useToastContext()
  const userId = session?.user?.id
  const isAlreadyDisliked = postDislikes?.includes(userId)

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    handlePostOptimistically()
    const serverResponse = await handlePostLike(postId, 'dislike')
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

  return (
    <form className="post-dislike-button relative ml-[1px] interactive-blue-soft rounded-xl border border-app-blue/0 z-20">
      <button
        className={styles + ' flex justify-center items-center'}
        type="submit"
        onClick={onClick}
      >
        {isAlreadyDisliked ? (
          <DislikeIcoActive className={'text-app-strongorange-500'} />
        ) : (
          <DislikeIco className={'text-app-blue-text'} />
        )}
      </button>
    </form>
  )
}
