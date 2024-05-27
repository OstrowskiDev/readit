'use client'

import PostsSearch from '../ui/PostsSearch'
import CreateBtn from '../ui/buttons/CreateBtn'
import { filterPosts } from '../lib/db'
import { Post } from '../ui/Post'
import { useEffect, useState } from 'react'
import { CreatePostForm } from '../ui/CreatePostForm'
import { FilterPostsForm } from '../ui/FilterPostsForm'
import { FilterBtn } from '../ui/buttons/FilterBtn'
import { ToastProvider } from '../lib/toasts/ToastProvider'
import { Loader } from '../ui/loaders/Loader'
import { PostShimmer } from '../ui/loaders/PostShimmer'

export default function PostsPage({ searchParams, onlyCurrentUserPosts }) {
  const [posts, setPosts] = useState(null)
  const [authorsData, setAuthorsData] = useState([])
  const [isCreateFormVis, setIsCreateFormVis] = useState(false)
  const [isFilterFormVis, setIsFilterFormVis] = useState(false)
  const [triggerReset, setTriggerReset] = useState(false)
  const [fastQuery, setFastQuery] = useState(searchParams.fastQuery || '')

  useEffect(() => {
    async function fetchData() {
      let filterData = searchParams

      if (onlyCurrentUserPosts) {
        filterData = { ...filterData, onlyCurrentUserPosts }
      }
      const postsData = await filterPosts(filterData)
      setPosts(postsData)
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (triggerReset) {
      setFastQuery('')
      setTriggerReset(false)
    }
  }, [triggerReset])

  const matchingPosts = posts?.filter(
    (post) =>
      post.title.toLowerCase().includes(fastQuery.toLowerCase()) ||
      post.authorData.name.toLowerCase().includes(fastQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(fastQuery.toLowerCase()),
  )
  return (
    <>
      <ToastProvider authorsData={authorsData} setAuthorsData={setAuthorsData}>
        <div className="container mx-auto mt-8 px-4 max-w-[800px]">
          <div className="flex md:items-center flex-col md:flex-row md:h-10 mb-4">
            <h1 className="grow below-md:hidden text-2xl font-semibold mr-4">
              Posts
            </h1>
            <PostsSearch
              triggerReset={triggerReset}
              setTriggerReset={setTriggerReset}
              setFastQuery={setFastQuery}
              isFilterFormVis={isFilterFormVis}
              setIsFilterFormVis={setIsFilterFormVis}
            />
            <FilterBtn
              isFilterFormVis={isFilterFormVis}
              setIsFilterFormVis={setIsFilterFormVis}
            />
            <CreateBtn
              isCreateFormVis={isCreateFormVis}
              setIsCreateFormVis={setIsCreateFormVis}
            />
          </div>
          <CreatePostForm
            posts={posts}
            setPosts={setPosts}
            isCreateFormVis={isCreateFormVis}
            setIsCreateFormVis={setIsCreateFormVis}
          />
          {isFilterFormVis && (
            <FilterPostsForm
              setTriggerReset={setTriggerReset}
              setPosts={setPosts}
              isFilterFormVis={isFilterFormVis}
              setIsFilterFormVis={setIsFilterFormVis}
              onlyCurrentUserPosts={onlyCurrentUserPosts}
            />
          )}

          {posts ? (
            <div className="flex flex-col items-center">
              {matchingPosts.map((post) => (
                <Post
                  key={post._id}
                  _id={post._id}
                  postId={post._id}
                  post={post}
                  setPosts={setPosts}
                  authorsData={authorsData}
                  setAuthorsData={setAuthorsData}
                  enableCommentBtn={false}
                />
              ))}
            </div>
          ) : (
            <>
              <Loader />
              <PostShimmer />
              <PostShimmer />
              <PostShimmer />
            </>
          )}
        </div>
      </ToastProvider>
    </>
  )
}
