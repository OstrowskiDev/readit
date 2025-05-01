import { createContext, useContext } from 'react'

const TextEditorContext = createContext()

export function TextEditorProvider({
  children,
  formData,
  setFormData,
  onContentChange,
}) {
  return (
    <TextEditorContext.Provider
      value={{
        formData,
        setFormData,
        onContentChange,
      }}
    >
      {children}
    </TextEditorContext.Provider>
  )
}

export function useTextEditorContext() {
  return useContext(TextEditorContext)
}
