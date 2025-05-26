'use client'

import { useEffect, useState } from 'react'
import { AuthorsDataProvider } from '@/lib/context/AuthorsDataProvider'
import { CreateBtn } from '@/ui/buttons/CreateBtn'
import { FilterBtn } from '@/ui/buttons/FilterBtn'
import { Loader } from '@/ui/loaders/Loader'
import { PostShimmer } from '@/ui/loaders/PostShimmer'
import { CreatePostForm } from '@/ui/post/CreatePostForm'
import { FilterPostsForm } from '@/ui/post/FilterPostsForm'
import { Post } from '@/ui/post/Post'
import { PostsSearch } from '@/ui/post/PostsSearch'
import { filterPosts } from '@/lib/db'
import { PaginationBar } from '@/ui/pagination/PaginationBar'

export default function PostsPage({
  searchParams,
  pageTitle,
  onlyCurrentUserPosts,
  displayedPostsAuthor,
  disableCreateBtn,
  disableFilteringByAuthor,
}) {
  const [posts, setPosts] = useState(null)
  const [postsCount, setPostsCount] = useState(0)
  const [authorsData, setAuthorsData] = useState([]) //UserInfobox data storage
  const [isCreateFormVis, setIsCreateFormVis] = useState(false)
  const [isFilterFormVis, setIsFilterFormVis] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [triggerReset, setTriggerReset] = useState(false)
  const [fastQuery, setFastQuery] = useState(searchParams.fastQuery || '')

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    async function fetchData() {
      let filterData = searchParams

      if (onlyCurrentUserPosts) {
        filterData = { ...filterData, onlyCurrentUserPosts }
      }
      if (displayedPostsAuthor) {
        filterData = { ...filterData, displayedPostsAuthor }
      }
      const results = await filterPosts(filterData)
      setPostsCount(results.postsCount)
      setPosts(results.posts)
    }
    fetchData().then(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    if (triggerReset) {
      setFastQuery('')
      setTriggerReset(false)
    }
  }, [triggerReset])

  const filterOptions = {
    setPosts,
    setPostsCount,
    setTriggerReset,
    onlyCurrentUserPosts,
  }

  return (
    <>
      <AuthorsDataProvider
        authorsData={authorsData}
        setAuthorsData={setAuthorsData}
      >
        <div className="posts-page mx-auto mt-2 md:mt-8 px-0 md:px-4 w-full max-w-[800px]">
          <div className="posts-container flex flex-col xs:flex-row below-xs:mb-2 md:mb-4">
            {pageTitle && (
              <h1 className="posts-title grow below-md:hidden text-2xl font-semibold mr-4">
                {pageTitle}
              </h1>
            )}
            <PostsSearch
              filterOptions={filterOptions}
              triggerReset={triggerReset}
              setTriggerReset={setTriggerReset}
              fastQuery={fastQuery}
              setFastQuery={setFastQuery}
              isFilterFormVis={isFilterFormVis}
              setIsFilterFormVis={setIsFilterFormVis}
            />
            <div className="search-btns flex mx-2 xs:ml-0 md:mr-2">
              <FilterBtn
                isFilterFormVis={isFilterFormVis}
                setIsFilterFormVis={setIsFilterFormVis}
              />
              {!disableCreateBtn && (
                <CreateBtn
                  isCreateFormVis={isCreateFormVis}
                  setIsCreateFormVis={setIsCreateFormVis}
                />
              )}
            </div>
          </div>
          <CreatePostForm
            posts={posts}
            setPosts={setPosts}
            isCreateFormVis={isCreateFormVis}
            setIsCreateFormVis={setIsCreateFormVis}
          />
          {isFilterFormVis && (
            <FilterPostsForm
              filterOptions={filterOptions}
              isFilterFormVis={isFilterFormVis}
              setIsFilterFormVis={setIsFilterFormVis}
              disableFilteringByAuthor={disableFilteringByAuthor}
            />
          )}

          <PaginationBar filterOptions={filterOptions} postsNum={postsCount} />

          {posts && (
            <div className="flex flex-col items-center">
              {posts.map((post) => (
                <Post
                  key={post._id}
                  _id={post._id}
                  postId={post._id}
                  post={post}
                  posts={posts}
                  setPosts={setPosts}
                  authorsData={authorsData}
                  setAuthorsData={setAuthorsData}
                  enableCommentBtn={true}
                  hasImage={post.has_image}
                  imageExtension={post.image_extension}
                  tempImageUrl={post.temp_image_url}
                />
              ))}
            </div>
          )}

          <PaginationBar filterOptions={filterOptions} postsNum={postsCount} />

          {isLoading && (
            <>
              <Loader />
              <PostShimmer />
              <PostShimmer />
              <PostShimmer />
            </>
          )}

          {!isLoading && posts?.length === 0 && (
            <h2 className="text-xl m-4 italic">No documents found</h2>
          )}
        </div>
      </AuthorsDataProvider>
    </>
  )
}
