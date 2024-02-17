import { createContext, useContext, useState } from 'react'

const CommentContext = createContext()

export function CommentContextProvider({ children }) {
  const [isVisible, setIsVisible] = useState(false)
  const [isEditVisible, setIsEditVisible] = useState(false)

  return (
    <CommentContext.Provider value={{ isVisible, setIsVisible, isEditVisible, setIsEditVisible }}>
      {children}
    </CommentContext.Provider>
  )
}

export function useCommentContext() {
  return useContext(CommentContext)
}
