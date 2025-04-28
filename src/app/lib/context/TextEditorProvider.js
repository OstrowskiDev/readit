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
  onInputChange,
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
        onInputChange,
      }}
    >
      {children}
    </TextEditorContext.Provider>
  )
}

export function useTextEditorContext() {
  return useContext(TextEditorContext)
}
