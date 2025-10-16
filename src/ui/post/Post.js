'use client'

import { PostContextProvider } from '@/lib/context/PostContextProvider'
import { useMouseHover } from '@/lib/hooks/useMouseHover'
import { useState } from 'react'
import { PostAnchor } from './PostAnchor'
import { PostBody } from './PostBody'
import { PostFooter } from './PostFooter'
import { PostHeader } from './PostHeader'
import { PostTitle } from './PostTitle'
import { UserInfoboxWrapper } from '../infobox/UserInfoboxWrapper'

export function Post({
  postId,
  post,
  posts,
  setPosts,
  infoboxData,
  setInfoboxData,
  enableCommentBtn,
  hasImage = false,
  imageExtension = '',
  tempImageUrl,
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
          hasImage={hasImage}
          imageExtension={imageExtension}
          tempImageUrl={tempImageUrl}
          infoboxData={infoboxData}
          setInfoboxData={setInfoboxData}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
          setDeleted={setDeleted}
        >
          <div className={`relative w-full ${deleted ? 'hidden' : ''}`}>
            <div
              className="post-container 
            glass-blue-soft interactive-blue-weak 
            flex flex-col justify-between 
            py-2 lg:py-1 px-4 lg:my-2 
            lg:rounded-md lg:shadow-center-md 
            border-t lg:border lg:hover:shadow-center-lg 
            below-md:rounded-none below-md:border-x-0
            hover:cursor-pointer"
            >
              <PostAnchor
                postId={postId}
                title={post.title}
                hasImage={hasImage}
              />
              <PostHeader author={post.authorData} />
              <PostTitle title={post.title} />
              <PostBody content={post.content} />
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
