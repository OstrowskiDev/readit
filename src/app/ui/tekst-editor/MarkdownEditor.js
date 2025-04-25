'use client'

import { useTextEnditorContext } from '@/app/lib/context/TextEditorProvider'
import parseHtmlToMarkdown from '@/app/lib/text-editor/parseHtmlToMarkdown'
import { useEffect } from 'react'

export function MarkdownEditor() {
  const { htmlString, markdownString, setMarkdownString } =
    useTextEnditorContext()

  useEffect(() => {
    const newMarkdown = parseHtmlToMarkdown(htmlString)
    setMarkdownString(newMarkdown)
  }, [])

  return (
    <div className="markdown-editor-container">
      <input
        className="markdown-editor-input"
        type="text"
        name="markdownString"
        id="markdownString"
        value={markdownString}
        onChange={onInputChange}
        required
      ></input>
    </div>
  )
}
