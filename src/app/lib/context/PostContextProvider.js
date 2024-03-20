import { createContext, useContext } from 'react'

const PostContext = createContext()

export function PostContextProvider({
  children,
  comments,
  setComments,
  authors,
  setAuthors,
  authorsData,
  setAuthorsData,
  post,
  setPost,
  postId,
  postLikes,
  postDislikes,
}) {
  return (
    <PostContext.Provider
      value={{
        comments,
        setComments,
        authors,
        setAuthors,
        authorsData,
        setAuthorsData,
        post,
        setPost,
        postId,
        postLikes,
        postDislikes,
      }}
    >
      {children}
    </PostContext.Provider>
  )
}

export function usePostContext() {
  return useContext(PostContext)
}
