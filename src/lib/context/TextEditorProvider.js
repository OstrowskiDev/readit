import { createContext, useContext } from 'react'

const TextEditorContext = createContext()

export function TextEditorProvider({
  children,
  formData,
  setFormData,
  onContentChange,
  editorHeight,
  toggleTextEditor,
  textareaHeight,
  setTextareaHeight,
}) {
  return (
    <TextEditorContext.Provider
      value={{
        formData,
        setFormData,
        onContentChange,
        editorHeight,
        toggleTextEditor,
        textareaHeight,
        setTextareaHeight,
      }}
    >
      {children}
    </TextEditorContext.Provider>
  )
}

export function useTextEditorContext() {
  return useContext(TextEditorContext)
}
