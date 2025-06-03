import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { ProfileFormButtons } from './ProfileFormButtons'
import { updateUserData } from '@/lib/actions/utils'
import { useMyProfileContext } from '@/lib/context/MyProfileProvider'

export function UserDataForm({ toggleUserDataForm }) {
  const { userData, setUserData, setResponse } = useMyProfileContext()
  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
    profession: userData.profession || '',
    organization: userData.organization || '',
  })
  const session = useSession()

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (session.status === 'authenticated') {
      setUserData({
        ...userData,
        profession: formData.profession,
        organization: formData.organization,
      })
      const response = await updateUserData({
        _id: userData._id,
        profession: formData.profession,
        organization: formData.organization,
      })
      if (response) setResponse(response)
      toggleUserDataForm()
    }
  }

  function handleCancel() {
    toggleUserDataForm()
  }

  const inactiveInputCss =
    ' glass-blue-weak rounded-md text-app-blue-text/70 min-w-10 w-full max-w-[330px] px-2 my-1'

  const activeInputCss =
    ' glass-blue-strong rounded-md text-app-blue-text min-w-10 w-full max-w-[330px] px-2 my-1 focus:border-app-blue focus:outline-none'

  return (
    <form className="form-user-data-container font-orbitron text-14 flex flex-col">
      <div className="form-data-name flex items-center">
        <label className="label-name text-app-blue-text w-28 mr-2">name:</label>
        <input
          className={`input-name ${inactiveInputCss}`}
          name="name"
          value={formData.name}
          disabled
        />
      </div>

      <div className="form-data-email flex items-center">
        <label className="label-email text-app-blue-text w-28 mr-2">
          email:
        </label>

        <input
          className={`input-email ${inactiveInputCss}`}
          name="email"
          value={formData.email}
          disabled
        />
      </div>

      <div className="form-data-profession flex items-center">
        <label className="label-profession text-app-blue-text w-28 mr-2">
          profession:
        </label>

        <input
          className={`input-profession ${activeInputCss}`}
          type="text"
          name="profession"
          value={formData.profession}
          onChange={handleChange}
        />
      </div>

      <div className="form-data-organization flex items-center">
        <label className="label-organization text-app-blue-text w-28 mr-2">
          organization:
        </label>
        <input
          className={`input-organization ${activeInputCss}`}
          type="text"
          name="organization"
          value={formData.organization}
          onChange={handleChange}
        />
      </div>

      <div className="btns-position-correction relative md:left-[-26px]">
        <ProfileFormButtons
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
        />
      </div>
    </form>
  )
}
