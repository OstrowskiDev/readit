'use client'

import { handleLikeClick } from '@/app/lib/actions'
import { LikeIco } from '../icons/LikeIco'
import { LikeIcoActive } from '../icons/LikeIcoActive'
import { usePostContext } from '@/app/lib/context/PostContextProvider'
import { signIn, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useToastContext } from '@/app/lib/toasts/ToastProvider'

export function PostLikeBtn({ styles }) {
  const { post, setPost, setPosts, postId, postLikes } = usePostContext()
  const [response, setResponse] = useState({
    state: null,
    message: null,
    wasDisliked: false,
  })
  const pathname = usePathname()
  const { toastFunctions: toast } = useToastContext()
  const { data: session, status } = useSession()
  // !!!
  if (status === 'loading')
    console.log(
      `starting to fetch session to PostLikeBtn: ${new Date().toISOString()}`,
    )
  if (status === 'authenticated')
    console.log(`session fetched to PostLikeBtn: ${new Date().toISOString()}`)
  if (status === 'authenticated') {
    console.log('session:', session)
  }
  const userId = session?.user?.id
  const isAlreadyLiked = postLikes?.includes(userId)
  const collection = 'posts'

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
    const serverResponse = await handleLikeClick(postId, collection)
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
    <form className="rounded-md hover:bg-gray-300">
      <button
        className={styles + ' flex justify-center items-center'}
        type="submit"
        onClick={onClick}
      >
        {isAlreadyLiked ? <LikeIcoActive /> : <LikeIco />}
      </button>
    </form>
  )
}
