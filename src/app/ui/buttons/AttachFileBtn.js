'use client'

import { AttachIco } from '../icons/AttachIco'

export function AttachFileBtn({ setImageFile }) {
  function handleChange(event) {
    //!!!! tutaj sprawdzenie autoryzacji
    const file = event.target.files[0]
    //!!!! tutaj walidacja obrazu po stronie klienta
    if (file) {
      setImageFile(file)
    }
  }

  return (
    <label className="attach-image-btn ">
      <div className="attach-image-icon btn-blue h-8 w-8 px-2 pt-[6px] ml-2 mt-1 cursor-pointer">
        <AttachIco />
      </div>
      <input
        className="hidden"
        type="file"
        accept="image/*"
        onChange={handleChange}
      />
    </label>
  )
}
