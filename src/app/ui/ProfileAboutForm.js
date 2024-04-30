import { useEffect, useRef, useState } from 'react'
import { ProfileFormButtons } from './ProfileFormButtons'

export function ProfileAboutForm({
  userData,
  setUserData,
  handleAboutFormVisibility,
}) {
  const [formState, setFormState] = useState(userData)
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
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setUserData(formState)
    handleAboutFormVisibility()
    // !!!! add function to update user data in db
  }

  const handleCancel = () => {
    handleAboutFormVisibility()
  }

  const autoGrow = (element) => {
    element.style.height = '5px'
    element.style.height = element.scrollHeight + 5 + 'px'
  }

  return (
    <form className="form-user-data-container flex flex-col relative left-[-5px] top-[-5px] pr-[51px]">
      <div className="form-data-about flex items-center">
        <textarea
          className="input-about w-full px-1 text-md text-gray-900 my-1 bg-gray-100 border border-gray-300 rounded-md"
          name="about"
          value={formState.about}
          onChange={handleChange}
          ref={textareaRef}
          onInput={(e) => autoGrow(e.target)}
        />
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
