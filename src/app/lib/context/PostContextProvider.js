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
  handleMouseEnter,
  handleMouseLeave,
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
        handleMouseEnter,
        handleMouseLeave,
      }}
    >
      {children}
    </PostContext.Provider>
  )
}

export function usePostContext() {
  return useContext(PostContext)
}
