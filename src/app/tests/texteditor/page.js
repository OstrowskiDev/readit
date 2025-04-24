'use client'

import customSchema from '@/app/lib/rehype-sanitize/customSchema'
import parseHtmlToMarkdown from '@/app/lib/text-editor/parseHtmlToMarkdown'
import testHtmlString from '@/app/lib/text-editor/testHtmlString'
import testMarkdownString from '@/app/lib/text-editor/testMarkdownString'
import QuillEditor from '@/app/ui/tekst-editor/QuillEditor'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import 'react-quill/dist/quill.snow.css'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import remarkGfm from 'remark-gfm'

export default function TekstEditor() {
  const [editorHtml, setEditorHtml] = useState(testHtmlString)
  const markdown = parseHtmlToMarkdown(editorHtml)

  function preprocessMarkdown(md) {
    return md
      .replace(/\^\((.*?)\)/g, (_, content) => `<sup>${content}</sup>`)
      .replace(
        />!(.*?)!</g,
        (_, content) => `<spoiler class="spoiler">${content}</spoiler>`,
      )
  }

  return (
    <div className="p-6 max-w-[640px] w-full mx-auto">
      <QuillEditor editorHtml={editorHtml} setEditorHtml={setEditorHtml} />

      <div>
        <h2 className="text-xl font-semibold mt-8">Converted Markdown</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
          {markdown}
        </pre>
      </div>

      <div>
        <h2 className="text-xl font-semibold mt-8">Markdown Preview</h2>
        <div className="markdown prose prose-neutral max-w-none bg-white p-4 rounded">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, [rehypeSanitize, customSchema]]}
          >
            {preprocessMarkdown(testMarkdownString)}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  )
}
