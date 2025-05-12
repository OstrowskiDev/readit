import { createContext, useContext } from 'react'

const TextEditorContext = createContext()

export function TextEditorProvider({
  children,
  formData,
  setFormData,
  onContentChange,
  editorHeight,
  toggleTextEditor,
}) {
  return (
    <TextEditorContext.Provider
      value={{
        formData,
        setFormData,
        onContentChange,
        editorHeight,
        toggleTextEditor,
      }}
    >
      {children}
    </TextEditorContext.Provider>
  )
}

export function useTextEditorContext() {
  return useContext(TextEditorContext)
}
