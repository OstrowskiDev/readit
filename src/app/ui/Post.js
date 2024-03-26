'use client'

import { useEffect, useState } from 'react'
import { PostFooter } from './PostFooter'
import { PostContextProvider } from '../lib/context/PostContextProvider'
import { PostHeader } from './PostHeader'
import { getPost } from '../lib/db'
import { countPostComments } from '../lib/actions'

export function Post({ postId, authorsData, setAuthorsData }) {
  const [post, setPost] = useState(null)
  const [commentsNum, setCommentsNum] = useState(null)

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
        <PostHeader />

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
