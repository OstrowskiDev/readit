import { createContext, useContext } from 'react'

const TextEditorContext = createContext()

export function TextEditorProvider({
  children,
  toggleEditor,
  setToggleEditor,
  htmlString,
  setHtmlString,
  markdownString,
  setMarkdownString,
}) {
  return (
    <TextEditorContext.Provider
      value={{
        toggleEditor,
        setToggleEditor,
        htmlString,
        setHtmlString,
        markdownString,
        setMarkdownString,
      }}
    >
      {children}
    </TextEditorContext.Provider>
  )
}

export function useTextEditorContext() {
  return useContext(TextEditorContext)
}
