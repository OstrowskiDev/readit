import { createContext, useState, useContext } from 'react'

export const InfoboxDataContext = createContext(null)

export function InfoboxDataProvider({ children }) {
  const [infoboxData, setInfoboxData] = useState([])

  return (
    <InfoboxDataContext.Provider value={{ infoboxData, setInfoboxData }}>
      {children}
    </InfoboxDataContext.Provider>
  )
}

export function useInfoboxContext() {
  return useContext(InfoboxDataContext)
}
