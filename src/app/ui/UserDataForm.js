import { useState } from 'react'
import { ProfileFormButtons } from './ProfileFormButtons'

export function UserDataForm({
  userData,
  setUserData,
  handleUserDataFormVisibility,
}) {
  const [formState, setFormState] = useState(userData)

  const handleChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setUserData(formState)
    handleUserDataFormVisibility()
    // !!!! add function to update user data in db
  }

  const handleCancel = () => {
    handleUserDataFormVisibility()
  }

  return (
    <form className="form-user-data-container">
      <div className="form-data-name flex items-center">
        <label className="label-name w-20 text-md text-gray-900">name:</label>
        <input
          className="input-name w-[330px] px-2 text-md text-gray-900 my-1 bg-gray-100 border border-gray-300 rounded-md"
          name="name"
          value={formState.name}
          onChange={handleChange}
        />
      </div>

      <div className="form-data-email flex items-center">
        <label className="label-email w-20 text-md text-gray-900">email:</label>
        <input
          className="input-email w-[330px] px-2 text-md text-gray-900 my-1 bg-gray-100 border border-gray-300 rounded-md"
          name="email"
          value={formState.email}
          onChange={handleChange}
        />
      </div>

      <div className="form-data-address flex items-center">
        <label className="label-address w-20 text-md text-gray-900">
          address:
        </label>
        <input
          className="input-address w-[330px] px-2 text-md text-gray-900 my-1 bg-gray-100 border border-gray-300 rounded-md"
          name="address"
          value={formState.address}
          onChange={handleChange}
        />
      </div>

      <div className="form-data-phone flex items-center">
        <label className="label-phone w-20 text-md text-gray-900">phone:</label>
        <input
          className="input-phone w-[330px] px-2 text-md text-gray-900 my-1 bg-gray-100 border border-gray-300 rounded-md"
          name="phone"
          value={formState.phone}
          onChange={handleChange}
        />
      </div>

      <div className="btns-position-correction relative left-[-26px]">
        <ProfileFormButtons
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
        />
      </div>
    </form>
  )
}
