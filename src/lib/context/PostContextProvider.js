import { createContext, useContext } from 'react'

const PostContext = createContext()

export function PostContextProvider({
  children,
  comments,
  setComments,
  authorsData,
  setAuthorsData,
  post,
  setPost,
  posts,
  setPosts,
  postId,
  postLikes,
  postDislikes,
  handleMouseEnter,
  handleMouseLeave,
  setDeleted,
  setIsEditFormVisible,
}) {
  return (
    <PostContext.Provider
      value={{
        comments,
        setComments,
        authorsData,
        setAuthorsData,
        post,
        setPost,
        posts,
        setPosts,
        postId,
        postLikes,
        postDislikes,
        handleMouseEnter,
        handleMouseLeave,
        setDeleted,
        setIsEditFormVisible,
      }}
    >
      {children}
    </PostContext.Provider>
  )
}

export function usePostContext() {
  return useContext(PostContext)
}
