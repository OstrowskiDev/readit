import { useEffect, useRef, useState } from 'react'
import { updateUserData } from '@/lib/actions/utils'
import { validateAbout } from '@/lib/security/validateAbout'
import { ProfileFormButtons } from './ProfileFormButtons'
import { useMyProfileContext } from '@/lib/context/MyProfileProvider'

export function ProfileAboutForm({ toggleAboutForm }) {
  const { userData, setUserData, setResponse } = useMyProfileContext()
  const [formData, setFormData] = useState(userData)
  const [errorMsg, setErrorMsg] = useState('')
  const [wasSubmited, setWasSubmited] = useState(false)
  const textareaRef = useRef(null)

  useEffect(() => {
    if (textareaRef.current) {
      autoGrow(textareaRef.current)
    }
  }, [])

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
    autoGrow(event.target)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setWasSubmited(true)

    const validationResults = validateAbout(formData)
    if (validationResults.errors) {
      setErrorMsg(validationResults.errors)
    } else {
      setErrorMsg('')
    }

    setUserData(formData)
    const response = await updateUserData(formData)
    if (response) setResponse(response)
    toggleAboutForm()
  }

  const handleCancel = () => {
    toggleAboutForm()
  }

  const autoGrow = (element) => {
    element.style.height = '5px'
    element.style.height = element.scrollHeight + 5 + 'px'
  }

  return (
    <form className="form-user-data-container flex flex-col relative left-[-5px] top-[-5px]">
      <div className="form-data-about flex items-center">
        <textarea
          className="input-about glass-blue-strong w-full px-1 text-md my-1 text-app-blue-text bg-black/10 focus:border-app-blue focus:outline-none rounded-md"
          name="about"
          value={formData.about}
          onChange={handleChange}
          ref={textareaRef}
        />
        {wasSubmited && errorMsg && (
          <label className="input-about-error text-red-500 text-sm">
            {errorMsg}
          </label>
        )}
      </div>
      <div className="btns-position-correction transition-height relative left-[5px]">
        <ProfileFormButtons
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
        />
      </div>
    </form>
  )
}
