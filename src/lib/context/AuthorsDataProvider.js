import { createContext, useState, useContext } from 'react'

export const AuthorsDataContext = createContext(null)

export function AuthorsDataProvider({ children }) {
  const [authorsData, setAuthorsData] = useState([])

  return (
    <AuthorsDataContext.Provider value={{ authorsData, setAuthorsData }}>
      {children}
    </AuthorsDataContext.Provider>
  )
}

export function useAuthorsContext() {
  return useContext(AuthorsDataContext)
}
