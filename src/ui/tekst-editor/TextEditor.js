'use client'

import { TextEditorProvider } from '@/lib/context/TextEditorProvider'
import { MarkdownEditor } from '@/ui/tekst-editor/MarkdownEditor'
import 'react-quill/dist/quill.snow.css'
import QuillEditorWithLoader from './QuillEditorWithLoader'
import { useState } from 'react'

export function TextEditor({
  formData,
  setFormData,
  onContentChange,
  editorHeight = 200,
  toggleTextEditor,
}) {
  const [textareaHeight, setTextareaHeight] = useState(editorHeight)

  return (
    <TextEditorProvider
      editorHeight={editorHeight}
      formData={formData}
      setFormData={setFormData}
      onContentChange={onContentChange}
      toggleTextEditor={toggleTextEditor}
      textareaHeight={textareaHeight}
      setTextareaHeight={setTextareaHeight}
    >
      <div
        className="text-editor-container w-full mx-auto"
        style={{
          height: `${
            toggleTextEditor ? textareaHeight + 70 : textareaHeight
          }px`,
        }}
      >
        {formData.toggleEditor === 'formatted_text_editor' ? (
          <QuillEditorWithLoader />
        ) : (
          <MarkdownEditor />
        )}
      </div>
    </TextEditorProvider>
  )
}
