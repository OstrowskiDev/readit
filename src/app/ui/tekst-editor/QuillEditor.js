'use client'

/***************************************************/
/*  Ensure this component is not server-rendered   */
/*  Quill instances can only run on clientent      */
/*  Below imports have Quill instances             */
/***************************************************/
import '@/app/lib/react-quill/customIcons.js'
import '@/app/lib/react-quill/spoilerBlot.js'
/***************************************************/

import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'
import QuillCustomToolbar from './QuillCustomToolbar'
import { useTextEditorContext } from '@/app/lib/context/TextEditorProvider'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

export default function QuillEditor() {
  const { htmlString, setHtmlString } = useTextEditorContext()
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
    <div className="quill-container max-w-[800px] mx-auto">
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
    </div>
  )
}
