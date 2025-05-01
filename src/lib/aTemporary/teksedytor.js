'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import TurndownService from 'turndown'
import ReactMarkdown from 'react-markdown'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css'

export default function MarkdownEditor() {
  const [htmlContent, setHtmlContent] = useState(
    '<p>Hello, <strong>world</strong>!</p>',
  )
  const [markdown, setMarkdown] = useState('')

  const turndownService = new TurndownService()

  const handleChange = (html) => {
    setHtmlContent(html)
    const markdownOutput = turndownService.turndown(html)
    setMarkdown(markdownOutput)
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Markdown Editor</h1>

      <div>
        <h2 className="text-xl mb-2">Edytor (react-quill)</h2>
        <ReactQuill value={htmlContent} onChange={handleChange} theme="snow" />
      </div>

      <div>
        <h2 className="text-xl mt-8 mb-2">Markdown Output</h2>
        <pre className="bg-gray-100 p-2 rounded border border-gray-300 whitespace-pre-wrap">
          {markdown}
        </pre>
      </div>

      <div>
        <h2 className="text-xl mt-8 mb-2">Preview (react-markdown)</h2>
        <div className="prose max-w-none">
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
      </div>
    </div>
  )
}
