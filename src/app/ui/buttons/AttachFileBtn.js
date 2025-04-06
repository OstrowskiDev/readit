'use client'

import { AttachIco } from '../icons/AttachIco'

export function AttachFileBtn({ onFileSelect }) {
  function handleChange(event) {
    const file = event.target.files[0]
    if (file && onFileSelect) {
      onFileSelect(file)
    }
  }

  return (
    <label
      className="attach-image-btn btn-blue h-10 w-10 px-4 py-2 ml-2 just-md:mr-2 md:mr-0"
      onClick={onClick}
    >
      <AttachIco />
      <input
        className="hidden"
        type="file"
        accept="image/*"
        onChange={handleChange}
      />
    </label>
  )
}
