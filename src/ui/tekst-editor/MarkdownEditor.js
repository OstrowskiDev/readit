'use client'

import { useTextEditorContext } from '@/lib/context/TextEditorProvider'
import { ToggleEditorTypeBtn } from './ToggleEditorTypeBtn'

export function MarkdownEditor() {
  const { formData, setFormData, editorHeight, toggleTextEditor } =
    useTextEditorContext()

  function onMarkdownChange(event) {
    setFormData({ ...formData, markdown: event.target.value })
  }

  return (
    <div className="markdown-editor">
      <div className="markdown-editor-container px-4 py-3 rounded-md">
        <div
          className="markdown-editor-btns-container w-full"
          style={{ display: `${toggleTextEditor ? 'flex' : 'none'}` }}
        >
          <ToggleEditorTypeBtn />
        </div>
        <textarea
          className="markdown-editor-input glass-blue-soft text-app-blue-text shadow-none bg-blue-950/5 w-full h-full px-3 py-2 border-none focus:outline-none resize-none"
          style={{ minHeight: `${editorHeight - 58}px` }}
          type="text"
          name="markdownString"
          id="markdownString"
          value={formData.markdown}
          onChange={onMarkdownChange}
          required
        ></textarea>
      </div>
    </div>
  )
}
