'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef } from 'react'
import 'react-quill/dist/quill.snow.css'
import '@/app/lib/react-quill/spoilerBlot.js'
import QuillCustomToolbar from './QuillCustomToolbar'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

export default function QuillEditor({ editorHtml, setEditorHtml }) {
  const quillRef = useRef(null)

  useEffect(() => {
    if (!quillRef.current) return

    const quillInstance = quillRef.current.getEditor()

    const insertSpoiler = () => {
      const selection = quillInstance.getSelection()
      if (selection && selection.length > 0) {
        quillInstance.formatText(
          selection.index,
          selection.length,
          'spoiler',
          true,
        )
      }
    }

    const toolbar = quillInstance.getModule('toolbar')
    toolbar.addHandler('insertSpoiler', insertSpoiler)
  }, [])

  const modules = {
    toolbar: {
      container: '#toolbar',
    },
  }

  const formats = [
    'header',
    'bold',
    'italic',
    'strike',
    'script',
    'list',
    'link',
    'blockquote',
    'code',
    'clean',
    'spoiler',
  ]

  return (
    <div className="quill-editor-container max-w-3xl mx-auto space-y-6">
      <h1 className="quill-editor-header text-2xl font-bold">Quill Editor</h1>

      <QuillCustomToolbar />

      <ReactQuill
        value={editorHtml}
        onChange={setEditorHtml}
        modules={modules}
        formats={formats}
        theme="snow"
      />

      <div className="quill-editor mt-8 border p-4 rounded bg-gray-50">
        <h2 className="quill-editor font-semibold">String HTML:</h2>
        {editorHtml}
      </div>

      <div className="quill-editor mt-8 border p-4 rounded bg-gray-50">
        <h2 className="quill-editor font-semibold">Wygenerowany HTML:</h2>
        <div dangerouslySetInnerHTML={{ __html: editorHtml }} />
      </div>
    </div>
  )
}
