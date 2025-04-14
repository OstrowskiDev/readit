import { useEffect, useRef, useState } from 'react'
import { updateUserData } from '../lib/actions/utils'
import { validateAbout } from '../lib/security/validateAbout'
import { ProfileFormButtons } from './ProfileFormButtons'

export function ProfileAboutForm({
  userData,
  setUserData,
  handleAboutFormVisibility,
}) {
  const [formState, setFormState] = useState(userData)
  const [errorMsg, setErrorMsg] = useState('')
  const [wasSubmited, setWasSubmited] = useState(false)
  const textareaRef = useRef(null)

  useEffect(() => {
    if (textareaRef.current) {
      autoGrow(textareaRef.current)
    }
  }, [])

  const handleChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    })
    autoGrow(event.target)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setWasSubmited(true)

    const validationResults = validateAbout(FormData)
    if (validationResults.errors) {
      setErrorMsg(validationResults.errors)
    } else {
      setErrorMsg('')
    }

    setUserData(formState)
    updateUserData(formState)
    handleAboutFormVisibility()
  }

  const handleCancel = () => {
    handleAboutFormVisibility()
  }

  const autoGrow = (element) => {
    element.style.height = '5px'
    element.style.height = element.scrollHeight + 5 + 'px'
  }

  return (
    <form className="form-user-data-container flex flex-col relative left-[-5px] top-[-5px]">
      <div className="form-data-about flex items-center">
        <textarea
          className="input-about w-full px-1 text-md text-gray-900 my-1 bg-gray-100 border border-gray-300 rounded-md"
          name="about"
          value={formState.about}
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
