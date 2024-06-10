import { useState } from 'react'
import { ProfileFormButtons } from './ProfileFormButtons'
import { updateUserData } from '../lib/actions'
import { useSession } from 'next-auth/react'

export function UserDataForm({
  userData,
  setUserData,
  handleUserDataFormVisibility,
}) {
  const [formState, setFormState] = useState(userData)
  const { status, update } = useSession()

  const handleChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (status === 'authenticated') {
      setUserData(formState)
      updateUserData(formState)
      update({
        name: formState.name,
      })
      handleUserDataFormVisibility()
    }
  }

  const handleCancel = () => {
    handleUserDataFormVisibility()
  }

  return (
    <form className="form-user-data-container flex flex-col">
      <div className="form-data-name flex items-center">
        <label className="label-name w-20 mr-2 text-md text-gray-900">
          name:
        </label>
        <input
          className="input-name min-w-10 w-full max-w-[330px] px-2 text-md text-gray-900 my-1 bg-gray-100 border border-gray-300 rounded-md"
          name="name"
          value={formState.name}
          onChange={handleChange}
        />
      </div>

      <div className="form-data-email flex items-center">
        <label className="label-email w-20 mr-2 text-md text-gray-900">
          email:
        </label>
        <input
          className="input-email min-w-10 w-full max-w-[330px] px-2 text-md text-gray-900 my-1 bg-gray-100 border border-gray-300 rounded-md"
          name="email"
          value={formState.email}
          onChange={handleChange}
        />
      </div>

      <div className="form-data-address flex items-center">
        <label className="label-address w-20 mr-2 text-md text-gray-900">
          address:
        </label>
        <input
          className="input-address min-w-10 w-full max-w-[330px] px-2 text-md text-gray-900 my-1 bg-gray-100 border border-gray-300 rounded-md"
          name="address"
          value={formState.address}
          onChange={handleChange}
        />
      </div>

      <div className="form-data-phone flex items-center">
        <label className="label-phone w-20 mr-2 text-md text-gray-900">
          phone:
        </label>
        <input
          className="input-phone min-w-10 w-full max-w-[330px] px-2 text-md text-gray-900 my-1 bg-gray-100 border border-gray-300 rounded-md"
          name="phone"
          value={formState.phone}
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
