'use client'

import PostsSearch from '../ui/PostsSearch'
import CreateBtn from '../ui/buttons/CreateBtn'
import sanitizeHtml from 'sanitize-html'
import { getPosts, getUsers } from '../lib/db'
import { Post } from '../ui/Post'
import { useEffect, useState } from 'react'
import { CreatePostForm } from '../ui/CreatePostForm'
import { FilterPostsForm } from '../ui/FilterPostsForm'

export default function Page({ searchParams }) {
  const [posts, setPosts] = useState(null)
  const [users, setUsers] = useState(null)
  const [authorsData, setAuthorsData] = useState([])
  const [isCreateFormVis, setIsCreateFormVis] = useState(false)
  const [isFilterFormVis, setIsFilterFormVis] = useState(false)

  useEffect(() => {
    async function fetchData() {
      const postsData = await getPosts()
      const usersData = await getUsers()
      setPosts(postsData)
      setUsers(usersData)
    }
    fetchData()
  }, [])

  const dirtyQuery = searchParams?.query || ''
  const query = sanitizeHtml(dirtyQuery, { allowedTags: null })
  const matchingPosts = posts?.filter(
    (post) =>
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.content.toLowerCase().includes(query.toLowerCase()),
  )
  return (
    <>
      {posts && (
        <div className="container mx-auto mt-8 px-4 max-w-[800px]">
          <div className="flex md:items-center flex-col md:flex-row md:h-10 mb-4">
            <h1 className="grow below-md:hidden text-2xl font-semibold mr-4">
              Posts
            </h1>
            <PostsSearch
              isFilterFormVis={isFilterFormVis}
              setIsFilterFormVis={setIsFilterFormVis}
            />
            <CreateBtn
              isCreateFormVis={isCreateFormVis}
              setIsCreateFormVis={setIsCreateFormVis}
            />
          </div>
          {isCreateFormVis && (
            <CreatePostForm
              isCreateFormVis={isCreateFormVis}
              setIsCreateFormVis={setIsCreateFormVis}
            />
          )}
          {isFilterFormVis && (
            <FilterPostsForm
              isFilterFormVis={isFilterFormVis}
              setIsFilterFormVis={setIsFilterFormVis}
            />
          )}
          <div className="flex flex-col items-center">
            {matchingPosts.map((post) => (
              <Post
                key={post._id}
                _id={post._id}
                postId={post._id}
                authorsData={authorsData}
                setAuthorsData={setAuthorsData}
                enableCommentBtn={false}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}
