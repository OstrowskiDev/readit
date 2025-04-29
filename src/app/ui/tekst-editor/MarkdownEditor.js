'use client'

import { useTextEditorContext } from '@/app/lib/context/TextEditorProvider'
import { ToggleEditorTypeBtn } from './ToggleEditorTypeBtn'

export function MarkdownEditor() {
  const { formData, setFormData } = useTextEditorContext()

  function onMarkdownChange(event) {
    setFormData({ ...formData, markdown: event.target.value })
  }

  return (
    <div className="markdown-editor">
      <div className="markdown-editor-container px-4 py-3 rounded-md">
        <div className="markdown-editor-btns-container flex w-full">
          <ToggleEditorTypeBtn />
        </div>
        <textarea
          className="markdown-editor-input w-full min-h-[240px] h-full px-3 py-2 border-none focus:outline-none bg-gray-50"
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
