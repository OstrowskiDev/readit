'use client'

import { Suspense, lazy, useEffect, useState } from 'react'
import { PostFooter } from './PostFooter'
import { PostContextProvider } from '../lib/context/PostContextProvider'
import { PostHeader } from './PostHeader'
import { getPost } from '../lib/db'
import { countPostComments } from '../lib/actions'
import { UserInfoboxLoader } from './loaders/UserInfoboxLoader'
const LazyUserInfobox = lazy(() => import('./UserInfobox.js'))

export function Post({
  postId,
  authorsData,
  setAuthorsData,
  enableCommentBtn,
}) {
  const [post, setPost] = useState(null)
  const [author, setAuthor] = useState(null)
  const [commentsNum, setCommentsNum] = useState(null)
  const [isUserHovered, setIsUserHovered] = useState(false)

  let onHoverTimeout
  let onHoverOutTimeout

  useEffect(() => {
    async function fetchData() {
      const postData = await getPost(postId)
      setPost(postData)

      const commentsNumber = await countPostComments(postId)
      setCommentsNum(commentsNumber)
    }

    fetchData()
  }, [])

  const postLikes = post?.likes
  const postDislikes = post?.dislikes
  const postAuthor = { _id: post?.user_id }

  function handleMouseEnter() {
    onHoverOutTimeout = setTimeout(() => {
      setIsUserHovered(true)
    }, 400)
    clearTimeout(onHoverTimeout)
  }

  function handleMouseLeave() {
    clearTimeout(onHoverOutTimeout)
    onHoverTimeout = setTimeout(() => {
      setIsUserHovered(false)
    }, 400)
  }

  return (
    <PostContextProvider
      post={post}
      setPost={setPost}
      postId={postId}
      postLikes={postLikes}
      postDislikes={postDislikes}
      authorsData={authorsData}
      setAuthorsData={setAuthorsData}
    >
      {post && (
        <div className="relative">
          <a
            href={`/posts/post/${postId}`}
            className="post-container flex flex-col justify-between max-w-[800px] 
            py-1 px-4 mx-4 my-2 rounded-md shadow-center-sm 
            border-white border-2 hover:border-blue-300
            hover:shadow-center-lg hover:cursor-pointer hover:outline-red-50"
          >
            {/* Post header */}
            <PostHeader
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
              author={author}
              setAuthor={setAuthor}
            />

            {/* Post title */}
            <div className="post-title-container flex justify-between py-2">
              <h2 className="post-title text-xl font-semibold">{post.title}</h2>
            </div>

            {/* Post body */}
            <pre className="post-body-text mb-2 font-sans whitespace-pre-wrap">
              {post.content}
            </pre>

            {/* Post footer */}
            <PostFooter
              postId={postId}
              commentNo={commentsNum}
              postLikes={postLikes}
              postDislikes={postDislikes}
              enableCommentBtn={enableCommentBtn}
            />
          </a>
          {/* user infobox on hover */}
          <Suspense fallback={<UserInfoboxLoader />}>
            {isUserHovered && (
              <LazyUserInfobox
                author={postAuthor}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
              />
            )}
          </Suspense>
        </div>
      )}
    </PostContextProvider>
  )
}
