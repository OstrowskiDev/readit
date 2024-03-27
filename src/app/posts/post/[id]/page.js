'use client'

import { getPost, getUser } from '@/app/lib/db'
import { Comment } from '@/app/ui/Comment'
import { PostFooter } from '@/app/ui/PostFooter'
import { getCommentsAndAuthors } from '@/app/lib/actions'
import { useEffect, useState } from 'react'
import { Loader } from '@/app/ui/loaders/Loader'
import { PostContextProvider } from '@/app/lib/context/PostContextProvider'
import { PostHeader } from '@/app/ui/PostHeader'

//need to refactor this page so it uses Post.js component

export default function PostPage({ params }) {
  const postId = params.id

  const [post, setPost] = useState(null)
  const [user, setUser] = useState(null)
  // author and setAuthor temporary used to pass those props to post header, shouldnt be needed after refactoring to Post.js component
  //for hover option to work copy paste functions: handleMouseEnter handleMouseLeave, and let declrations, though should not be necessary with Post.js
  const [author, setAuthor] = useState(null) //to be deleted
  const [comments, setComments] = useState(null)
  const [authors, setAuthors] = useState(null)
  const [authorsData, setAuthorsData] = useState([])

  useEffect(() => {
    async function fetchData() {
      const postData = await getPost(postId)
      setPost(postData)

      const userData = await getUser(postData.user_id)
      setUser(userData)

      const [commentsArr, authorsArr] = await getCommentsAndAuthors(postId)
      setComments(commentsArr)
      setAuthors(authorsArr)
    }

    fetchData()
  }, [])

  if (!post || !user || !comments) {
    return <Loader />
  }

  const postLikes = post.likes
  const postDislikes = post.dislikes

  return (
    <PostContextProvider
      comments={comments}
      setComments={setComments}
      authors={authors}
      setAuthors={setAuthors}
      authorsData={authorsData}
      setAuthorsData={setAuthorsData}
      post={post}
      setPost={setPost}
      postId={postId}
      postLikes={postLikes}
      postDislikes={postDislikes}
    >
      <div className="w-full flex justify-center my-8 px-4">
        <div className="post-card-container flex flex-col justify-between max-w-[800px] w-full p-4 mx-2 rounded-md shadow-center-sm">
          {/* Post header */}
          <PostHeader author={author} setAuthor={setAuthor} />
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
                {post.comments?.map((commentId) => (
                  <Comment
                    key={commentId}
                    comments={comments}
                    authors={authors}
                    commentId={commentId}
                    depth={0}
                    postId={postId}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </PostContextProvider>
  )
}
