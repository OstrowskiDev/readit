'use client'

import { useEffect, useState } from 'react'
import { filterFavorites } from '@/app/lib/db'
import { ToastProvider } from '@/app/lib/toasts/ToastProvider'
import PostsSearch from '@/app/ui/PostsSearch'
import { FilterBtn } from '@/app/ui/buttons/FilterBtn'
import { CreatePostForm } from '@/app/ui/CreatePostForm'
import { Post } from '@/app/ui/Post'
import { Loader } from '@/app/ui/loaders/Loader'
import { PostShimmer } from '@/app/ui/loaders/PostShimmer'
import { Comment } from '@/app/ui/Comment'
import { FilterFavoritesForm } from '@/app/ui/FilterFavoritesForm'

export default function FavoritesPage({ searchParams }) {
  const [posts, setPosts] = useState(null)
  const [comments, setComments] = useState(null)
  const [authorsData, setAuthorsData] = useState([])
  const [isCreateFormVis, setIsCreateFormVis] = useState(false)
  const [isFilterFormVis, setIsFilterFormVis] = useState(false)
  const [triggerReset, setTriggerReset] = useState(false)
  const [fastQuery, setFastQuery] = useState(searchParams.fastQuery || '')
  const [documentOrder, setDocumentOrder] = useState([])

  useEffect(() => {
    async function fetchData() {
      let filterData = searchParams
      const fetchedData = await filterFavorites(filterData)

      const sortedData = fetchedData.map((document) => ({
        _id: document._id,
        type: document.type,
      }))
      setDocumentOrder(sortedData)

      const postsData = fetchedData.filter(
        (document) => document.type === 'post',
      )
      const commentsData = fetchedData.filter(
        (document) => document.type === 'comment',
      )
      setPosts(postsData)
      setComments(commentsData)
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (triggerReset) {
      setFastQuery('')
      setTriggerReset(false)
    }
  }, [triggerReset])

  const allDocuments = documentOrder.map((document) => {
    return document.type === 'post'
      ? posts.find((post) => post._id === document._id)
      : comments.find((comment) => comment._id === document._id)
  })
  const matchingDocuments = allDocuments
    .filter(
      (document) =>
        (document.type === 'post' &&
          document.title.toLowerCase().includes(fastQuery.toLowerCase())) ||
        document.authorData.name
          .toLowerCase()
          .includes(fastQuery.toLowerCase()) ||
        document.content.toLowerCase().includes(fastQuery.toLowerCase()),
    )
    .map((document) => ({ _id: document._id, type: document.type }))

  return (
    <>
      <ToastProvider authorsData={authorsData} setAuthorsData={setAuthorsData}>
        <div className="container mx-auto mt-8 px-4 max-w-[800px]">
          <div className="flex md:items-center flex-col md:flex-row md:h-10 mb-4">
            <h1 className="grow below-md:hidden text-2xl font-semibold mr-4">
              Favorites
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
          </div>
          {isCreateFormVis && (
            <CreatePostForm
              isCreateFormVis={isCreateFormVis}
              setIsCreateFormVis={setIsCreateFormVis}
            />
          )}
          {isFilterFormVis && (
            <FilterFavoritesForm
              enableActivityFilter={false}
              setTriggerReset={setTriggerReset}
              isFilterFormVis={isFilterFormVis}
              setIsFilterFormVis={setIsFilterFormVis}
              setPosts={setPosts}
              setComments={setComments}
              setDocumentOrder={setDocumentOrder}
            />
          )}

          {matchingDocuments && (posts || comments) ? (
            <div className="flex flex-col items-center">
              {matchingDocuments.map((sortingObj) => {
                const document =
                  sortingObj.type === 'post'
                    ? posts.find((post) => post._id === sortingObj._id)
                    : comments.find((comment) => comment._id === sortingObj._id)
                if (!document) return null
                return document.type === 'post' ? (
                  <Post
                    key={document._id}
                    _id={document._id}
                    postId={document._id}
                    post={document}
                    setPosts={setPosts}
                    enableCommentBtn={true}
                  />
                ) : (
                  <a
                    href={`/posts/post/${document.rootPostId}#${document._id}`}
                    key={document._id}
                    _id={document._id}
                    className="comment-anchor-container flex pb-4 px-4 my-2 rounded-md shadow-center-sm border-white border-2 hover:border-blue-300 hover:shadow-center-lg hover:cursor-pointer hover:outline-red-50"
                  >
                    <Comment
                      comment={document}
                      commentId={document._id}
                      depth={1}
                      comments={comments}
                      setComments={setComments}
                      renderChildren={false}
                      // anchorComment={true}
                      enableReplyBtn={true}
                    />
                  </a>
                )
              })}
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
