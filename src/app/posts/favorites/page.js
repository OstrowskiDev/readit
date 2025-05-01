'use client'

import { AuthorsDataProvider } from '@/app/lib/context/AuthorsDataProvider'
import { filterFavorites } from '@/app/lib/db'
import { FilterBtn } from '@/app/ui/buttons/FilterBtn'
import { Comment } from '@/app/ui/comment/Comment'
import { Loader } from '@/app/ui/loaders/Loader'
import { PostShimmer } from '@/app/ui/loaders/PostShimmer'
import { FilterFavoritesForm } from '@/app/ui/post/FilterFavoritesForm'
import { Post } from '@/app/ui/post/Post'
import { PostsSearch } from '@/app/ui/post/PostsSearch'
import { signIn, useSession } from 'next-auth/react'
import { useEffect, useRef, useState } from 'react'

export default function FavoritesPage({ searchParams }) {
  const [posts, setPosts] = useState(null)
  const [comments, setComments] = useState(null)
  const [authorsData, setAuthorsData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFilterFormVis, setIsFilterFormVis] = useState(false)
  const [triggerReset, setTriggerReset] = useState(false)
  const [fastQuery, setFastQuery] = useState(searchParams.fastQuery || '')
  const [documentOrder, setDocumentOrder] = useState([])
  const { data: session } = useSession()
  const signingIn = useRef(false)

  // eslint-disable-next-line react-hooks/exhaustive-deps
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

    if (!session) {
      //below code to fix firefox issues with calling signIn() in useEffect
      //reference to github next-auth issue 9177:
      //https://github.com/nextauthjs/next-auth/issues/9177
      if (signingIn.current) return
      signingIn.current = true
      signIn()
      return
    }

    if (session?.user?.id) {
      fetchData().then(() => setIsLoading(false))
    }
  }, [session])

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
      <AuthorsDataProvider
        authorsData={authorsData}
        setAuthorsData={setAuthorsData}
      >
        <div className="favorites-container mx-auto mt-2 xs:mt-8 xs:px-4 max-w-[800px]">
          <div className="flex md:items-center md:h-10 below-xs:mr-2 mb-4">
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

          {matchingDocuments && (posts || comments) && (
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
                    posts={posts}
                    setPosts={setPosts}
                    enableCommentBtn={true}
                  />
                ) : (
                  <a
                    href={`/posts/post/${document.rootPostId}#${document._id}`}
                    key={document._id}
                    _id={document._id}
                    className="comment-anchor-container flex w-full pb-4 px-4 xs:my-2 xs:rounded-md xs:shadow-center-md border-gray-300 xs:border-white border-t xs:border-2 xs:hover:border-blue-300 xs:hover:shadow-center-lg hover:cursor-pointer"
                  >
                    <Comment
                      comment={document}
                      commentId={document._id}
                      depth={1}
                      comments={comments}
                      setComments={setComments}
                      renderChildren={false}
                    />
                  </a>
                )
              })}
            </div>
          )}
          {isLoading && (
            <>
              <Loader />
              <PostShimmer />
              <PostShimmer />
              <PostShimmer />
            </>
          )}
          {!isLoading && matchingDocuments.length === 0 && (
            <h2 className="text-xl m-4 italic">No documents found</h2>
          )}
        </div>
      </AuthorsDataProvider>
    </>
  )
}
