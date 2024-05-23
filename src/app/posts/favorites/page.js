'use client'

import { useEffect, useState } from 'react'
import { filterFavorites } from '@/app/lib/db'
import { ToastProvider } from '@/app/lib/toasts/ToastProvider'
import PostsSearch from '@/app/ui/PostsSearch'
import { FilterBtn } from '@/app/ui/buttons/FilterBtn'
import CreateBtn from '@/app/ui/buttons/CreateBtn'
import { CreatePostForm } from '@/app/ui/CreatePostForm'
import { FilterPostsForm } from '@/app/ui/FilterPostsForm'
import { Post } from '@/app/ui/Post'
import { Loader } from '@/app/ui/loaders/Loader'
import { PostShimmer } from '@/app/ui/loaders/PostShimmer'
import { Comment } from '@/app/ui/Comment'

export default function FavoritesPage({ searchParams }) {
  const [posts, setPosts] = useState(null)
  const [comments, setComments] = useState(null)
  const [authorsData, setAuthorsData] = useState([])
  const [isCreateFormVis, setIsCreateFormVis] = useState(false)
  const [isFilterFormVis, setIsFilterFormVis] = useState(false)
  const [triggerReset, setTriggerReset] = useState(false)
  const [fastQuery, setFastQuery] = useState(searchParams.fastQuery || '')

  useEffect(() => {
    async function fetchData() {
      let filterData = searchParams
      const fetchedData = await filterFavorites(filterData)
      // !!!! I don't like this part of code. Posts and Comments need to be in same array for sorting purposes of favoritesPage. [posts, setPosts] is old naming convention used in PostPage.js. Here it stores also Comments. It doesn't make sense here. But all other components use it, and for rest of app it is logical since post-comment structure is build from top to bottom. So I will keep it for now.
      //// !!!! [comments, setComments] is also naming convention used in rest of app. Here it is used for optimistic update for comment buttons. Since Posts have similar structure to Comments I can pass Posts+Comments array to Comment Component. It is good idea, since it will work nicely with sorting but naming convention is confusing. I want to find better solution for this.
      setPosts(fetchedData)
      setComments(fetchedData)
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (triggerReset) {
      setFastQuery('')
      setTriggerReset(false)
    }
  }, [triggerReset])

  const matchingDocuments = posts?.filter(
    (document) =>
      (document.type === 'post' &&
        document.title.toLowerCase().includes(fastQuery.toLowerCase())) ||
      document.authorData.name
        .toLowerCase()
        .includes(fastQuery.toLowerCase()) ||
      document.content.toLowerCase().includes(fastQuery.toLowerCase()),
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
          {isCreateFormVis && (
            <CreatePostForm
              isCreateFormVis={isCreateFormVis}
              setIsCreateFormVis={setIsCreateFormVis}
            />
          )}
          {isFilterFormVis && (
            <FilterPostsForm
              enableActivityFilter={false}
              setTriggerReset={setTriggerReset}
              setPosts={setPosts}
              isFilterFormVis={isFilterFormVis}
              setIsFilterFormVis={setIsFilterFormVis}
            />
          )}

          {posts ? (
            <div className="flex flex-col items-center">
              {matchingDocuments.map((document) =>
                document.type === 'post' ? (
                  <Post
                    key={document._id}
                    _id={document._id}
                    postId={document._id}
                    post={document}
                    setPosts={setPosts}
                    enableCommentBtn={false}
                  />
                ) : (
                  <Comment
                    key={document._id}
                    _id={document._id}
                    comment={document}
                    commentId={document._id}
                    depth={1}
                    comments={comments}
                    setComments={setComments}
                    renderChildren={false}
                    anchorComment={true}
                  />
                ),
              )}
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
