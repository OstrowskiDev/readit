'use client'

import { AuthorsDataProvider } from '@/lib/context/AuthorsDataProvider'
import { PostContextProvider } from '@/lib/context/PostContextProvider'
import { getPostCommentsData, getPostData } from '@/lib/db'
import { useMouseHover } from '@/lib/hooks/useMouseHover'
import { UserInfoboxWrapper } from '@/ui/infobox/UserInfoboxWrapper'
import { PostCommentShimmer } from '@/ui/loaders/PostCommentShimmer'
import { PostCommentSection } from '@/ui/post/PostCommentsSection'
import { PostContent } from '@/ui/post/PostContent'
import { PostEditForm } from '@/ui/post/PostEditForm'
import { PostFooter } from '@/ui/post/PostFooter'
import { PostHeader } from '@/ui/post/PostHeader'
import { PostImage } from '@/ui/post/PostImage'
import { useEffect, useState } from 'react'
import { Loader } from '@/ui/loaders/Loader'

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
            className={`post-card-container max-w-[800px] w-full mx-auto md:shadow-center-md rounded-md ${
              deleted ? 'hidden' : ''
            }`}
          >
            <div className="post-container relative flex flex-col justify-between w-full pt-4 px-4 md:pb-4">
              {/* Post header */}
              <PostHeader author={post.authorData} />
              <div className="post-title-container flex justify-between mb-4">
                <h2 className="post-title-text text-2xl pt-4 font-semibold">
                  {post.title}
                </h2>
              </div>

              <UserInfoboxWrapper
                authorData={post.authorData}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
                isUserHovered={isUserHovered}
              />

              {post.has_image && (
                <PostImage
                  postId={postId}
                  imageExtension={post.image_extension}
                />
              )}

              <PostContent content={post.content} />

              <PostEditForm
                isEditFormVisible={isEditFormVisible}
                setIsEditFormVisible={setIsEditFormVisible}
              />

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

            <PostCommentSection />
          </div>
        </div>
        {deleted && <Loader />}
      </PostContextProvider>
    </AuthorsDataProvider>
  )
}
