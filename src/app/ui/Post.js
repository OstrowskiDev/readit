'use client'

import { useState } from 'react'
import { PostFooter } from './PostFooter'
import { PostContextProvider } from '../lib/context/PostContextProvider'
import { PostHeader } from './PostHeader'
import useMouseHover from '../lib/hooks/useMouseHover'
import { UserInfoboxWrapper } from './UserInfoboxWrapper'
import { PostAnchor } from './PostAnchor'
import { PostTitle } from './PostTitle'
import { PostBody } from './PostBody'

export function Post({
  postId,
  post,
  posts,
  setPosts,
  authorsData,
  setAuthorsData,
  enableCommentBtn,
  hasImage = false,
  imageExtension = '',
}) {
  const { isUserHovered, handleMouseEnter, handleMouseLeave } = useMouseHover()
  const [deleted, setDeleted] = useState(false)

  return (
    <>
      {post && (
        <PostContextProvider
          post={post}
          posts={posts}
          setPosts={setPosts}
          postId={postId}
          postLikes={post.likes}
          postDislikes={post.dislikes}
          authorsData={authorsData}
          setAuthorsData={setAuthorsData}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
          setDeleted={setDeleted}
        >
          <div className={`relative w-full ${deleted ? 'hidden' : ''}`}>
            <div
              className="post-container flex flex-col justify-between
              py-2 md:py-1 px-4 md:my-2 md:rounded-md md:shadow-center-md
              border-t md:border-2 border-gray-300 md:border-white hover:border-blue-300
              md:hover:shadow-center-lg hover:cursor-pointer hover:outline-red-50"
            >
              <PostAnchor postId={postId} />
              <PostHeader author={post.authorData} />
              <PostTitle title={post.title} />
              <PostBody
                hasImage={hasImage}
                postId={postId}
                imageExtension={imageExtension}
                content={post.content}
              />
              <PostFooter
                postId={postId}
                commentNo={post.commentsCount}
                postLikes={post.likes}
                postDislikes={post.dislikes}
                enableCommentBtn={enableCommentBtn}
              />
            </div>

            <UserInfoboxWrapper
              authorData={post.authorData}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
              isUserHovered={isUserHovered}
            />
          </div>
        </PostContextProvider>
      )}
    </>
  )
}
