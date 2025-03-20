'use client'

import { getPostCommentsData, getPostData } from '@/app/lib/db'
import { Comment } from '@/app/ui/Comment'
import { PostFooter } from '@/app/ui/PostFooter'
import { Suspense, lazy, useEffect, useState } from 'react'
import { Loader } from '@/app/ui/loaders/Loader'
import { PostContextProvider } from '@/app/lib/context/PostContextProvider'
import { PostHeader } from '@/app/ui/PostHeader'
import { PostCommentShimmer } from '@/app/ui/loaders/PostCommentShimmer'
import useMouseHover from '@/app/lib/hooks/useMouseHover'
import { UserInfoboxLoader } from '@/app/ui/loaders/UserInfoboxLoader'
import { PostEditForm } from '@/app/ui/PostEditForm'
import { AuthorsDataProvider } from '@/app/lib/context/AuthorsDataProvider'
const LazyUserInfobox = lazy(() => import('@/app/ui/UserInfobox.js'))

export default function PostPage({ params }) {
  const postId = params.id
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState(null)
  const [authorsData, setAuthorsData] = useState([])
  const [isCommFormVisible, setIsCommFormVisible] = useState(false)
  const [isEditFormVisible, setIsEditFormVisible] = useState(false)
  const [deleted, setDeleted] = useState(false)

  const { isUserHovered, handleMouseEnter, handleMouseLeave } = useMouseHover()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const paramsEditPost = params.get('editPost')
    const paramCreateComment = params.get('createComment')
    if (paramsEditPost === 'true') {
      setIsEditFormVisible(true)
    }
    if (paramCreateComment === 'true') {
      setIsCommFormVisible(true)
    }
  }, [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    async function fetchData() {
      const [postData, commentsData] = await Promise.all([
        getPostData(postId),
        getPostCommentsData(postId),
      ])
      setPost(postData)
      setComments(commentsData)
    }

    fetchData()
  }, [])

  if (!post || !comments) {
    return (
      <>
        <div className="container mx-auto mt-8 px-4 max-w-[800px]">
          <Loader />
          <PostCommentShimmer />
        </div>
      </>
    )
  }

  const postLikes = post.likes
  const postDislikes = post.dislikes

  return (
    <AuthorsDataProvider
      authorsData={authorsData}
      setAuthorsData={setAuthorsData}
    >
      <PostContextProvider
        comments={comments}
        setComments={setComments}
        setDeleted={setDeleted}
        post={post}
        setPost={setPost}
        postId={postId}
        postLikes={postLikes}
        postDislikes={postDislikes}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
        setIsEditFormVisible={setIsEditFormVisible}
      >
        <div className="post-page w-full flex flex-col justify-center md:px-4 mt-1 md:my-8 md:mx-auto">
          <div
            className={`post-card-container max-w-[800px] mx-auto md:shadow-center-md rounded-md ${
              deleted ? 'hidden' : ''
            }`}
          >
            <div className="post-container relative flex flex-col justify-between w-full pt-4 px-4 md:pb-4">
              {/* Post header */}
              <PostHeader author={post.authorData} />
              <div className="post-header flex justify-between mb-4">
                <h2 className="post-title text-2xl pt-4 font-semibold">
                  {post.title}
                </h2>
              </div>

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

              {/* Post body */}
              <pre className="post-content font-sans whitespace-pre-wrap">
                {post.content}
              </pre>

              {/* Post edit form */}
              <PostEditForm
                isEditFormVisible={isEditFormVisible}
                setIsEditFormVisible={setIsEditFormVisible}
              />

              {/* Post footer */}
              <PostFooter
                postId={postId}
                commentNo={comments.length}
                postLikes={postLikes}
                postDislikes={postDislikes}
                enableCommentBtn={true}
                isCommFormVisible={isCommFormVisible}
                setIsCommFormVisible={setIsCommFormVisible}
              />
            </div>
            {/* Comments section */}
            <div className="post-comments-container md:px-5 md:pb-5 bg-white">
              {post.comments && (
                <div className="comments-container below-md:relative">
                  <h3 className="comments-header text-lg pt-1 below-md:ml-4 font-semibold">
                    Comments:
                  </h3>
                  <div className="comments-list pr-2 pl-7 pb-6 mt-1 bg-gray-100 md:rounded-md">
                    {post.comments?.map((commentId) => {
                      const comment = comments.find((c) => c._id === commentId)
                      return (
                        <Comment
                          key={commentId}
                          comment={comment}
                          comments={comments}
                          setComments={setComments}
                          commentId={commentId}
                          depth={0}
                          postId={postId}
                          renderChildren={true}
                        />
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {deleted && <Loader />}
      </PostContextProvider>
    </AuthorsDataProvider>
  )
}
