'use client'

import { Suspense, lazy, useState } from 'react'
import { PostFooter } from './PostFooter'
import { PostContextProvider } from '../lib/context/PostContextProvider'
import { PostHeader } from './PostHeader'
import { UserInfoboxLoader } from './loaders/UserInfoboxLoader'
import useMouseHover from '../lib/hooks/useMouseHover'
const LazyUserInfobox = lazy(() => import('./UserInfobox.js'))

export function Post({
  postId,
  post,
  posts,
  setPosts,
  authorsData,
  setAuthorsData,
  enableCommentBtn,
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
            <a
              href={`/posts/post/${postId}`}
              className="post-container flex flex-col justify-between
              py-2 md:py-1 px-4 md:my-2 md:rounded-md md:shadow-center-md
              border-t md:border-2 border-gray-300 md:border-white hover:border-blue-300
              md:hover:shadow-center-lg hover:cursor-pointer hover:outline-red-50"
            >
              {/* Post header */}
              <PostHeader author={post.authorData} />

              {/* Post title */}
              <div className="post-title-container flex justify-between py-2">
                <h2 className="post-title text-xl font-semibold">
                  {post.title}
                </h2>
              </div>

              {/* Post body */}
              <pre className="post-content mb-2 font-sans whitespace-pre-wrap below-md:line-clamp-5 below-md:overflow-hidden below-md:overflow-ellipsis ">
                {post.content}
              </pre>

              {/* Post footer */}
              <PostFooter
                postId={postId}
                commentNo={post.commentsCount}
                postLikes={post.likes}
                postDislikes={post.dislikes}
                enableCommentBtn={enableCommentBtn}
              />
            </a>
            {/* user infobox on hover */}
            <Suspense fallback={<UserInfoboxLoader />}>
              {isUserHovered && (
                <LazyUserInfobox
                  author={post.authorData}
                  handleMouseEnter={handleMouseEnter}
                  handleMouseLeave={handleMouseLeave}
                />
              )}
            </Suspense>
          </div>
        </PostContextProvider>
      )}
    </>
  )
}
