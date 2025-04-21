'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'
import TurndownService from 'turndown'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import testMarkdown from './markdown'
import rehypeSanitize from 'rehype-sanitize'
import rehypeRaw from 'rehype-raw'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link'],
    ['clean'],
  ],
}

const customSchema = {
  tagNames: [
    'h1',
    'h2',
    'br',
    'hr',
    'a',
    'strong',
    'em',
    'del',
    'code',
    'p',
    'sup',
    'ul',
    'li',
    'ol',
    'blockquote',
    'pre',
    'spoiler',
    'table',
    'tbody',
    'td',
    'th',
    'thead',
    'tfoot',
    'tr',
  ],
  attributes: {
    a: ['href'],
    spoiler: ['className'],
  },
}

export default function EditorPage() {
  const [html, setHtml] = useState('')

  const turndownService = new TurndownService({
    headingStyle: 'atx',
    bulletListMarker: '-',
  })

  turndownService.addRule('superscript', {
    filter: 'sup',
    replacement: (content) => `^(${content})`,
  })

  turndownService.addRule('spoiler', {
    filter: (node) =>
      node.nodeName === 'SPAN' && node.classList.contains('spoiler'),
    replacement: (content) => `>!${content}!<`,
  })

  const markdown = turndownService.turndown(html)

  function preprocessMarkdown(md) {
    return md
      .replace(/\^\((.*?)\)/g, (_, content) => `<sup>${content}</sup>`)
      .replace(
        />!(.*?)!</g,
        (_, content) => `<spoiler class="spoiler">${content}</spoiler>`,
      )
  }

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">Markdown Editor</h1>

      <div>
        <ReactQuill
          value={html}
          onChange={setHtml}
          modules={modules}
          className="bg-white"
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold mt-8">Generated HTML</h2>
        <div className="border p-4 rounded bg-gray-50 whitespace-pre-wrap">
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>

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
            {preprocessMarkdown(testMarkdown)}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  )
}
