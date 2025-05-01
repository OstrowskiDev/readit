'use client'

import { TextEditorProvider } from '@/lib/context/TextEditorProvider'
import { MarkdownEditor } from '@/ui/tekst-editor/MarkdownEditor'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'

const QuillEditor = dynamic(() => import('@/ui/tekst-editor/QuillEditor'), {
  ssr: false,
})

export function TextEditor({ formData, setFormData, onContentChange }) {
  return (
    <TextEditorProvider
      formData={formData}
      setFormData={setFormData}
      onContentChange={onContentChange}
    >
      <div className="text-editor-container w-full mx-auto">
        {formData.toggleEditor === 'formated_text_editor' ? (
          <QuillEditor />
        ) : (
          <MarkdownEditor />
        )}
      </div>
    </TextEditorProvider>
  )
}
