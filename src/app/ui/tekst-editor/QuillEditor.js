'use client'

/***************************************************/
/*  Ensure this component is not server-rendered   */
/*  Quill instances can only run on clientent      */
/*  Below imports have Quill instances             */
/***************************************************/
import '@/app/lib/react-quill/customIcons.js'
import '@/app/lib/react-quill/spoilerBlot.js'
import '@/app/lib/react-quill/crossedBlot.js'
/***************************************************/

import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'
import QuillCustomToolbar from './QuillCustomToolbar'
import { useTextEditorContext } from '@/app/lib/context/TextEditorProvider'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

export default function QuillEditor() {
  const { onContentChange, formData } = useTextEditorContext()
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
      <div className="quill-editor-container min-h-[300px] px-4 py-3 rounded-md">
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
