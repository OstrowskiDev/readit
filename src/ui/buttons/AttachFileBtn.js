'use client'

import { signIn, useSession } from 'next-auth/react'
import { AttachIco } from '../icons/AttachIco'
import validateImageFileClient from '@/lib/security/validateImageFileClient'
import { useRef } from 'react'

export function AttachFileBtn({ setImageFile, setResponse, setImageAction }) {
  const { data: session } = useSession()
  const inputRef = useRef(null)

  function handleKeyDown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      inputRef.current.click()
    }
  }

  async function handleChange(event) {
    if (!session) return signIn()
    const file = event.target.files[0]
    if (file) {
      const validationResults = await validateImageFileClient(file)
      if (
        validationResults.type.status === 'success' &&
        validationResults.size.status === 'success'
      ) {
        setImageFile(file)
        setImageAction('update')
        setResponse({
          state: 'success',
          message: 'Image attached successfully!',
        })
      } else if (validationResults.type.status === 'error') {
        setResponse({
          state: 'error',
          message: validationResults.type.message,
        })
      } else {
        setResponse({
          state: 'error',
          message: validationResults.size.message,
        })
      }
    }
  }

  return (
    <label
      role="button"
      aria-label="Attach image file"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="attach-image-btn wrapper-orange-btn-bg ml-2 mt-1"
    >
      <div className="attach-image-icon flex items-center button-orange-strong h-9 w-8 px-2 cursor-pointer">
        <AttachIco />
      </div>
      <input
        ref={inputRef}
        className="hidden"
        type="file"
        accept="image/*"
        onChange={handleChange}
      />
    </label>
  )
}
