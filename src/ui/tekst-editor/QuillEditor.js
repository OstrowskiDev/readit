'use client'

/***************************************************/
/*  Ensure this component is not server-rendered   */
/*  Quill instances can only run on client         */
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
import { useCallback, useEffect, useRef } from 'react'
import { usePostContext } from '@/lib/context/PostContextProvider'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

export default function QuillEditor() {
  const textareaRef = useRef(null)
  const { setTriggerRebuild } = usePostContext()
  const { onContentChange, formData, textareaHeight, setTextareaHeight } =
    useTextEditorContext()
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

  const handleResize = useCallback((entries) => {
    for (let entry of entries) {
      const { height } = entry.contentRect
      setTextareaHeight(height)
      setTriggerRebuild((counter) => counter + 1)
    }
  }, [])

  useEffect(() => {
    const textarea = textareaRef.current
    if (!textarea) return

    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(textarea)
    return () => resizeObserver.disconnect()
  }, [])

  return (
    <div className="quill-container">
      <div className="quill-editor-container h-full  px-4 py-3 rounded-md ">
        <QuillCustomToolbar />
        <div
          className="quill-editor-input render-html h-full overflow-y-auto blue-scrollbar blue-resizer"
          ref={textareaRef}
          style={{
            height: `${textareaHeight}px`,
            minHeight: '90px',
            maxHeight: '600px',
            resize: 'vertical',
          }}
        >
          <ReactQuill
            value={formData?.content}
            onChange={onContentChange}
            modules={modules}
            formats={formats}
            theme="snow"
          />
        </div>
      </div>
    </div>
  )
}
