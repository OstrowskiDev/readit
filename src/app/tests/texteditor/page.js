'use client'

import { TextEditorProvider } from '@/app/lib/context/TextEditorProvider'
import customSchema from '@/app/lib/rehype-sanitize/customSchema'
import { parseHtmlToMarkdown } from '@/app/lib/text-editor/parseHtmlToMarkdown'
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

// !!!! need to pass { onInputChange } as a prop to TextEditor component when used outside of app/tests/texteditor route

export default function TekstEditor() {
  const [htmlString, setHtmlString] = useState(testHtmlString)
  const [markdownString, setMarkdownString] = useState('')
  const [toggleEditor, setToggleEditor] = useState('formated_text_editor')

  function onInputChange() {
    console.log('not passed from root partent yet')
  }

  return (
    <TextEditorProvider
      htmlString={htmlString}
      setHtmlString={setHtmlString}
      markdownString={markdownString}
      setMarkdownString={setMarkdownString}
      toggleEditor={toggleEditor}
      setToggleEditor={setToggleEditor}
      onInputChange={onInputChange}
    >
      <div className="text-editor-container p-6 max-w-[640px] w-full mx-auto">
        {toggleEditor === 'formated_text_editor' ? (
          <QuillEditor />
        ) : (
          <MarkdownEditor />
        )}
      </div>
    </TextEditorProvider>
  )
}
