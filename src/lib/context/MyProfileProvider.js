import { createContext, useContext } from 'react'

const MyProfileContext = createContext()

export function MyProfileProvider({
  children,
  userData,
  setUserData,
  setResponse,
}) {
  return (
    <MyProfileContext.Provider value={{ userData, setUserData, setResponse }}>
      {children}
    </MyProfileContext.Provider>
  )
}

export function useMyProfileContext() {
  return useContext(MyProfileContext)
}
