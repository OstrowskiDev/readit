'use client'

import { getPostCommentsData, getPostData } from '@/app/lib/db'
import { Comment } from '@/app/ui/Comment'
import { PostFooter } from '@/app/ui/PostFooter'
import { Suspense, lazy, useEffect, useState } from 'react'
import { Loader } from '@/app/ui/loaders/Loader'
import { PostContextProvider } from '@/app/lib/context/PostContextProvider'
import { PostHeader } from '@/app/ui/PostHeader'
import useMouseHover from '@/app/lib/hooks/useMouseHover'
import { UserInfoboxLoader } from '@/app/ui/loaders/UserInfoboxLoader'
import { ToastProvider } from '@/app/lib/toasts/ToastProvider'
const LazyUserInfobox = lazy(() => import('@/app/ui/UserInfobox.js'))

export default function PostPage({ params }) {
  const postId = params.id
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState(null)
  const [authorsData, setAuthorsData] = useState([])
  const { isUserHovered, handleMouseEnter, handleMouseLeave } = useMouseHover()

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
    return <Loader />
  }

  const postLikes = post.likes
  const postDislikes = post.dislikes

  return (
    <ToastProvider>
      <PostContextProvider
        comments={comments}
        setComments={setComments}
        authorsData={authorsData}
        setAuthorsData={setAuthorsData}
        post={post}
        setPost={setPost}
        postId={postId}
        postLikes={postLikes}
        postDislikes={postDislikes}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
      >
        <div className="w-full flex justify-center my-8 px-4">
          <div className="post-card-container relative flex flex-col justify-between max-w-[800px] w-full p-4 mx-2 rounded-md shadow-center-sm">
            {/* Post header */}
            <PostHeader author={post.authorData} />
            <div className="post-header flex justify-between mb-4">
              <h2 className="post-title text-2xl pt-4 font-semibold">
                {post.title}
              </h2>
            </div>

            {/* Post body */}
            <pre className="post-body-text font-sans whitespace-pre-wrap">
              {post.content}
            </pre>

            {/* Post footer */}
            <PostFooter
              postId={postId}
              commentNo={comments.length}
              postLikes={postLikes}
              postDislikes={postDislikes}
              enableCommentBtn={true}
            />

            {/* Comments section */}
            {post.comments && (
              <div className="comments-container">
                <h3 className="comments-header text-lg pt-1 font-semibold">
                  Comments:
                </h3>
                <div className="comments-list bg-gray-100 pl-8 pr-3 pb-6 mt-1 rounded-md">
                  {post.comments?.map((commentId) => {
                    const comment = comments.find((c) => c._id === commentId)
                    return (
                      <Comment
                        key={commentId}
                        comment={comment}
                        comments={comments}
                        commentId={commentId}
                        depth={0}
                        postId={postId}
                      />
                    )
                  })}
                </div>
              </div>
            )}

            {/* User Infobox on hover */}
            <Suspense fallback={<UserInfoboxLoader />}>
              {isUserHovered && <LazyUserInfobox author={post.authorData} />}
            </Suspense>
          </div>
        </div>
      </PostContextProvider>
    </ToastProvider>
  )
}
