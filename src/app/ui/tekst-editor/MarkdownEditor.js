'use client'

import parseHtmlToMarkdown from '@/app/lib/text-editor/parseHtmlToMarkdown'

export function MarkdownEditor({ editorHtml, setEditorHtml }) {
  const [markdown, setMarkdown] = useState(() =>
    parseHtmlToMarkdown(editorHtml),
  )

  return (
    <div className="markdown-editor-container">
      <input
        className="markdown-editor-input"
        type="text"
        name="markdown"
        id="markdown"
        value={markdown}
        onChange={onInputChange}
        required
      ></input>
    </div>
  )
}
