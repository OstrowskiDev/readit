import { createContext, useContext } from 'react'

const PostContext = createContext()

export function PostContextProvider({ children, comments, setComments, authors, setAuthors }) {
  return (
    <PostContext.Provider value={{ comments, setComments, authors, setAuthors }}>
      {children}
    </PostContext.Provider>
  )
}

export function usePostContext() {
  return useContext(PostContext)
}
