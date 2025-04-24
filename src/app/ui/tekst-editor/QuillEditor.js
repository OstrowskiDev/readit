'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef } from 'react'
import 'react-quill/dist/quill.snow.css'
import '@/app/lib/react-quill/spoilerBlot.js'
import QuillCustomToolbar from './QuillCustomToolbar'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

export default function QuillEditor({ htmlString, setHtmlString }) {
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
    <div className="quill-container max-w-3xl mx-auto">
      <h1 className="quill-header text-2xl font-bold">Quill Editor</h1>
      <div className="quill-editor-container px-4 py-3 border border-gray-400 rounded-md">
        <QuillCustomToolbar />
        <ReactQuill
          value={htmlString}
          onChange={setHtmlString}
          modules={modules}
          formats={formats}
          theme="snow"
        />
      </div>
      <div className="quill-editor mt-8 border p-4 rounded bg-gray-50">
        <h2 className="quill-editor font-semibold">String HTML:</h2>
        {htmlString}
      </div>
      <div className="quill-editor mt-8 border p-4 rounded bg-gray-50">
        <h2 className="quill-editor font-semibold">Wygenerowany HTML:</h2>
        <div dangerouslySetInnerHTML={{ __html: htmlString }} />
      </div>
    </div>
  )
}
