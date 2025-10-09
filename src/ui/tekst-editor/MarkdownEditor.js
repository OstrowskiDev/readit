'use client'

import { useTextEditorContext } from '@/lib/context/TextEditorProvider'
import { ToggleEditorTypeBtn } from './ToggleEditorTypeBtn'
import { useCallback, useEffect, useRef } from 'react'
import { usePostContext } from '@/lib/context/PostContextProvider'

export function MarkdownEditor() {
  const textareaRef = useRef(null)
  // setting below values for cases when editor is used out of PostContext
  const { setTriggerRebuild = false } = usePostContext() || {}
  const {
    formData,
    setFormData,
    toggleTextEditor,
    textareaHeight,
    setTextareaHeight,
  } = useTextEditorContext()

  const handleResize = useCallback((entries) => {
    for (let entry of entries) {
      const { height } = entry.contentRect
      setTextareaHeight(height)
      if (setTriggerRebuild) {
        setTriggerRebuild((counter) => counter + 1)
      }
    }
  }, [])

  useEffect(() => {
    const textarea = textareaRef.current
    if (!textarea) return

    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(textarea)
    return () => resizeObserver.disconnect()
  }, [])

  function onMarkdownChange(event) {
    setFormData({ ...formData, markdown: event.target.value })
  }

  return (
    <div className="markdown-editor h-full">
      <div className="markdown-editor-container h-full px-4 py-3 rounded-md">
        <div
          className="markdown-editor-btns-container w-full h-10"
          style={{ display: `${toggleTextEditor ? 'flex' : 'none'}` }}
        >
          <ToggleEditorTypeBtn />
        </div>
        <textarea
          className="markdown-editor-input text-app-blue-text shadow-none bg-blue-950/5 w-full h-full my-0 border-none focus:outline-none  overflow-y-auto blue-scrollbar blue-resizer"
          ref={textareaRef}
          style={{
            height: `${textareaHeight}px`,
            minHeight: '90px',
            maxHeight: '600px',
            resize: 'vertical',
          }}
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
