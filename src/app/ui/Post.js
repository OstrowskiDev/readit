'use client'

import { Suspense, lazy } from 'react'
import { PostFooter } from './PostFooter'
import { PostContextProvider } from '../lib/context/PostContextProvider'
import { PostHeader } from './PostHeader'
import { UserInfoboxLoader } from './loaders/UserInfoboxLoader'
import useMouseHover from '../lib/hooks/useMouseHover'
const LazyUserInfobox = lazy(() => import('./UserInfobox.js'))

export function Post({
  post,
  postId,
  authorsData,
  setAuthorsData,
  enableCommentBtn,
}) {
  //below monstrosity is only for refactoring purposes, it will be removed in after refactoring is done
  const setPost = () =>
    console.log(
      'setPost no longer needed, post object data is passed as a prop, and setPost functionality in optimistic UI will be moved to setPosts array',
    )
  const { isUserHovered, handleMouseEnter, handleMouseLeave } = useMouseHover()

  const postLikes = post?.likes
  const postDislikes = post?.dislikes

  return (
    <PostContextProvider
      post={post}
      setPost={setPost}
      postId={postId}
      postLikes={postLikes}
      postDislikes={postDislikes}
      authorsData={authorsData}
      setAuthorsData={setAuthorsData}
      handleMouseEnter={handleMouseEnter}
      handleMouseLeave={handleMouseLeave}
    >
      {post && (
        <div className="relative w-full">
          <a
            href={`/posts/post/${postId}`}
            className="post-container flex flex-col justify-between
            py-1 px-4 my-2 rounded-md shadow-center-sm 
            border-white border-2 hover:border-blue-300
            hover:shadow-center-lg hover:cursor-pointer hover:outline-red-50"
          >
            {/* Post header */}
            <PostHeader author={post.authorData} />

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
              commentNo={post.commentsCount}
              postLikes={postLikes}
              postDislikes={postDislikes}
              enableCommentBtn={enableCommentBtn}
            />
          </a>
          {/* user infobox on hover */}
          <Suspense fallback={<UserInfoboxLoader />}>
            {isUserHovered && <LazyUserInfobox author={post.authorData} />}
          </Suspense>
        </div>
      )}
    </PostContextProvider>
  )
}
