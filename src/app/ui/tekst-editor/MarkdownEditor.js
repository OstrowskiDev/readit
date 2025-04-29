'use client'

import { useTextEditorContext } from '@/app/lib/context/TextEditorProvider'
import { parseHtmlToMarkdown } from '@/app/lib/text-editor/parseHtmlToMarkdown'
import { useEffect } from 'react'
import { ToggleEditorTypeBtn } from './ToggleEditorTypeBtn'

export function MarkdownEditor() {
  //!!!! add onInputChange to context import and delete onInputChange func below
  const { htmlString, markdownString, setMarkdownString } =
    useTextEditorContext()

  function onInputChange(event) {
    setMarkdownString(event.target.value)
  }

  useEffect(() => {
    const newMarkdown = parseHtmlToMarkdown(htmlString)
    setMarkdownString(newMarkdown)
  }, [])

  return (
    <div className="markdown-editor">
      <div className="markdown-editor-container px-4 py-3 border border-gray-400 rounded-md">
        <div className="markdown-editor-btns-container flex w-full">
          <ToggleEditorTypeBtn />
        </div>
        <textarea
          className="markdown-editor-input w-full h-32 px-3 py-2 border-none focus:outline-none"
          type="text"
          name="markdownString"
          id="markdownString"
          value={markdownString}
          onChange={onInputChange}
          required
        ></textarea>
      </div>
    </div>
  )
}
