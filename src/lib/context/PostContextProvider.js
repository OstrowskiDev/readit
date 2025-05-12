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
  triggerRebuild,
  setTriggerRebuild,
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
        triggerRebuild,
        setTriggerRebuild,
      }}
    >
      {children}
    </PostContext.Provider>
  )
}

export function usePostContext() {
  return useContext(PostContext)
}
