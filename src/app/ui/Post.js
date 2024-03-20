'use client'

import { Suspense, lazy, useEffect, useState } from 'react'
import { getPost, getUser } from '../lib/db'
import { useSession } from 'next-auth/react'
import { EditPostBtn } from './buttons/EditPostBtn'
import { DeletePostBtn } from './buttons/DeletePostBtn'
import { PostOptionsBtn } from './buttons/PostOptionsBtn'
import { PostFooter } from './PostFooter'
import { PostContextProvider } from '../lib/context/PostContextProvider'
import { countPostComments } from '../lib/actions'
import Avatar from '../lib/avatars/Avatar'
import TimeAgo from './TimeAgo'
import { UserInfoboxLoader } from './loaders/UserInfoboxLoader'
const LazyUserInfobox = lazy(() => import('./UserInfobox.js'))

export function Post({ postId, authorsData, setAuthorsData }) {
  const { data: session } = useSession()
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

      //fetch userName instead of whole user?
      const userData = await getUser(postData.user_id)
      setAuthor(userData)

      const commentsNumber = await countPostComments(postId)
      setCommentsNum(commentsNumber)
    }

    fetchData()
  }, [])

  const postLikes = post?.likes
  const postDislikes = post?.dislikes

  const userId = post?.user_id
  const sessionUserId = session?.user.id
  const isPostAuthor = userId === sessionUserId

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
      <div className="post-container flex flex-col justify-between max-w-[800px] py-1 px-4 mx-4 my-2 rounded-md shadow-center-sm">
        {/* authors avatar, user name, comment and edit time, top buttons */}
        <div className="comment-header-container relative right-0 flex items-center">
          {/* authors avatar */}
          <div
            className="comment-avatar-container min-w-8 min-h-8 hover:cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Avatar
              seed={author?.avatar.seed}
              color={author?.avatar.color}
              size={32}
              border={1}
            />
          </div>

          {/* authors name */}
          <p
            className="comment-author ml-2 font-bold text-blue-900 text-15 hover:cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {author?.name}
          </p>

          {/* post time, edit time */}
          <TimeAgo
            createdAt={post?.createdAt}
            updatedAt={post?.updatedAt}
            type="created"
          />

          {/* top right buttons */}
          <div className="post-top-btns ml-auto flex gap-2">
            {isPostAuthor && <EditPostBtn postId={postId} />}
            {isPostAuthor && <DeletePostBtn postId={postId} />}
            <PostOptionsBtn postId={postId} />
          </div>

          {/* user infobox on hover */}
          <Suspense fallback={<UserInfoboxLoader />}>
            {isUserHovered && <LazyUserInfobox author={author} />}
          </Suspense>
        </div>

        {/* Post title */}
        <div className="post-header flex justify-between py-2">
          <h2 className="post-title text-xl font-semibold">{post?.title}</h2>
        </div>

        {/* Post body */}
        <pre className="post-body-text mb-2 font-sans whitespace-pre-wrap">
          {post?.content}
        </pre>

        {/* Post footer */}
        <PostFooter
          postId={postId}
          commentNo={commentsNum}
          postLikes={postLikes}
          postDislikes={postDislikes}
        />
      </div>
    </PostContextProvider>
  )
}
