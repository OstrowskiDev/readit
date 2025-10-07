'use client'

import dynamic from 'next/dynamic'

function QuillLoader() {
  return (
    <div className="loader-quill rounded-md h-full translate-y-1/2">
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
