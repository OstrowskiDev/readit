'use client'

import dynamic from 'next/dynamic'
import { useTextEditorContext } from '@/lib/context/TextEditorProvider'

function QuillLoader() {
  const { editorHeight } = useTextEditorContext()
  return (
    <div
      className="loader-quill rounded-md translate-y-1/2"
      style={{ minHeight: `${editorHeight}px` }}
    >
      <p className="text-center text-gray-300 text-lg">Loading...</p>
    </div>
  )
}

const QuillEditor = dynamic(() => import('./QuillEditor'), {
  ssr: false,
  loading: () => <QuillLoader />,
})

export default function QuillEditorWithLoader() {
  return <QuillEditor />
}
