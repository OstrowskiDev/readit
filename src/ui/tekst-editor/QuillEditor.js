'use client'

/***************************************************/
/*  Ensure this component is not server-rendered   */
/*  Quill instances can only run on clientent      */
/*  Below imports have Quill instances             */
/***************************************************/
import '@/services/react-quill/customIcons.js'
import '@/services/react-quill/spoilerBlot.js'
import '@/services/react-quill/crossedBlot.js'
/***************************************************/

import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'
import QuillCustomToolbar from './QuillCustomToolbar'
import { useTextEditorContext } from '@/lib/context/TextEditorProvider'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

export default function QuillEditor() {
  const { onContentChange, formData, editorHeight } = useTextEditorContext()
  const modules = {
    toolbar: {
      container: '#toolbar',
    },
  }

  const formats = [
    'header',
    'bold',
    'italic',
    'crossed',
    'script',
    'list',
    'link',
    'blockquote',
    'code',
    'clean',
    'spoiler',
  ]

  return (
    <div className="quill-container">
      <div
        className="quill-editor-container render-html px-4 py-3 rounded-md"
        style={{ minHeight: `${editorHeight}px` }}
      >
        <QuillCustomToolbar />
        <ReactQuill
          value={formData?.content}
          onChange={onContentChange}
          modules={modules}
          formats={formats}
          theme="snow"
        />
      </div>
    </div>
  )
}
