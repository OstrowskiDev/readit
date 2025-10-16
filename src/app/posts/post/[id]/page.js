'use client'

import { InfoboxDataProvider } from '@/lib/context/InfoboxDataProvider'
import { PostContextProvider } from '@/lib/context/PostContextProvider'
import { getPostCommentsData } from '@/lib/actions/comment'
import { useMouseHover } from '@/lib/hooks/useMouseHover'
import { getPostData } from '@/lib/actions/post'
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

export default function PostPage({ params, searchParams }) {
  const postId = params.id
  const hasImg = searchParams?.i === 'true'
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState(null)
  const [infoboxData, setInfoboxData] = useState([])
  const [isCommFormVisible, setIsCommFormVisible] = useState(false)
  const [isEditFormVisible, setIsEditFormVisible] = useState(false)
  const [deleted, setDeleted] = useState(false)
  const [triggerRebuild, setTriggerRebuild] = useState(0)

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
      <div className="shimmer-loader-container mx-auto mt-8 w-full max-w-[800px]">
        <Loader />
        <PostCommentShimmer hasImg={hasImg} />
      </div>
    )
  }

  const postLikes = post.likes
  const postDislikes = post.dislikes

  return (
    <InfoboxDataProvider
      infoboxData={infoboxData}
      setInfoboxData={setInfoboxData}
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
        isEditFormVisible={isEditFormVisible}
        setIsEditFormVisible={setIsEditFormVisible}
        triggerRebuild={triggerRebuild}
        setTriggerRebuild={setTriggerRebuild}
        imageExtension={post.image_extension}
        tempImageUrl={post.temp_image_url}
      >
        <div className="post-page w-full flex flex-col justify-center lg:px-4 mt-1 lg:my-8 lg:mx-auto">
          {/* Important! Don't use backdrop-filter blur on post-card-container. Some of its descendant also use backdrop filter with blur, and using it on this ancestor element would disable blur effects on all descendants, even when visually they are rendered 'above' it on screen. Instead of glass-blue-soft is used glass-blue-soft-alt that mimics backdrop-filter blur effect */}
          <div
            className={`post-card-container glass-blue-soft-alt max-w-[800px] w-full mx-auto lg:shadow-center-md rounded-md ${
              deleted ? 'hidden' : ''
            }`}
          >
            <div className="post-container relative flex flex-col justify-between w-full pt-4 px-4 lg:pb-4">
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

              {post.has_image && <PostImage />}

              <PostContent content={post.content} />

              <PostEditForm />

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
    </InfoboxDataProvider>
  )
}
