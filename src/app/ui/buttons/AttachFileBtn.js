'use client'

import { signIn, useSession } from 'next-auth/react'
import { AttachIco } from '../icons/AttachIco'
import validateImageFileClient from '@/app/lib/security/validateImageFileClient'

export function AttachFileBtn({ setImageFile, setResponse }) {
  const { data: session } = useSession()

  async function handleChange(event) {
    if (!session) return signIn()
    const file = event.target.files[0]
    if (file) {
      const validationResults = await validateImageFileClient(file)
      if (validationResults.type && validationResults.size) {
        setImageFile(file)
        setResponse({
          state: 'success',
          message: 'Image attached sucessfully!',
        })
      } else {
        setResponse({
          state: 'error',
          message: 'You can only upload one image not larger than 2MB',
        })
      }
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
