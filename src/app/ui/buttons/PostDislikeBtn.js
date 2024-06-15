'use client'

import { handleDislikeClick } from '@/app/lib/actions'
import { DislikeIco } from '../icons/DislikeIco'
import { DislikeIcoActive } from '../icons/DislikeIcoActive'
import { usePostContext } from '@/app/lib/context/PostContextProvider'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useToastContext } from '@/app/lib/toasts/ToastProvider'

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
  const collection = 'posts'

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
    const serverResponse = await handleDislikeClick(postId, collection)
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
    <form className="ml-[1px] rounded-md hover:bg-gray-300">
      <button
        className={styles + ' flex justify-center items-center'}
        type="submit"
        onClick={onClick}
      >
        {isAlreadyDisliked ? <DislikeIcoActive /> : <DislikeIco />}
      </button>
    </form>
  )
}
