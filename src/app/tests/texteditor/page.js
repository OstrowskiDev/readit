'use client'

import { TextEditorProvider } from '@/app/lib/context/TextEditorProvider'
import customSchema from '@/app/lib/rehype-sanitize/customSchema'
import parseHtmlToMarkdown from '@/app/lib/text-editor/parseHtmlToMarkdown'
import testHtmlString from '@/app/lib/text-editor/testHtmlString'
import testMarkdownString from '@/app/lib/text-editor/testMarkdownString'
import { MarkdownEditor } from '@/app/ui/tekst-editor/MarkdownEditor'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import 'react-quill/dist/quill.snow.css'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import remarkGfm from 'remark-gfm'

const QuillEditor = dynamic(() => import('@/app/ui/tekst-editor/QuillEditor'), {
  ssr: false,
})

export default function TekstEditor() {
  const [htmlString, setHtmlString] = useState(testHtmlString)
  const [markdownString, setMarkdownString] = useState('')
  const [toggleEditor, setToggleEditor] = useState('formated_text_editor')
  //!!!! delete after development:
  const markdownForDevelopment = parseHtmlToMarkdown(htmlString)

  return (
    <TextEditorProvider
      htmlString={htmlString}
      setHtmlString={setHtmlString}
      markdownString={markdownString}
      setMarkdownString={setMarkdownString}
      toggleEditor={toggleEditor}
      setToggleEditor={setToggleEditor}
    >
      <div className="text-editor-container p-6 max-w-[640px] w-full mx-auto">
        {toggleEditor === 'formated_text_editor' ? (
          <QuillEditor />
        ) : (
          <MarkdownEditor />
        )}

        {/* development previews below */}
        {/* !!!! also delete after development !!!! */}
        <div>
          <h2 className="text-xl font-semibold mt-8">Converted Markdown</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
            {markdownForDevelopment}
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
    </TextEditorProvider>
  )
}

function preprocessMarkdown(md) {
  return md
    .replace(/\^\((.*?)\)/g, (_, content) => `<sup>${content}</sup>`)
    .replace(
      />!(.*?)!</g,
      (_, content) => `<spoiler class="spoiler">${content}</spoiler>`,
    )
}
