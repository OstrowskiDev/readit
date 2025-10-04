'use client'

import { TextEditorProvider } from '@/lib/context/TextEditorProvider'
import { MarkdownEditor } from '@/ui/tekst-editor/MarkdownEditor'
import 'react-quill/dist/quill.snow.css'
import QuillEditorWithLoader from './QuillEditorWithLoader'

export function TextEditor({
  formData,
  setFormData,
  onContentChange,
  editorHeight,
  toggleTextEditor,
}) {
  return (
    <TextEditorProvider
      editorHeight={editorHeight}
      formData={formData}
      setFormData={setFormData}
      onContentChange={onContentChange}
      toggleTextEditor={toggleTextEditor}
    >
      <div className="text-editor-container w-full mx-auto">
        {formData.toggleEditor === 'formatted_text_editor' ? (
          <QuillEditorWithLoader />
        ) : (
          <MarkdownEditor />
        )}
      </div>
    </TextEditorProvider>
  )
}
