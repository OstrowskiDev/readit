import { useState } from 'react'
import { MyProfileUserData } from './MyProfileUserData'
import { UserDataForm } from './UserDataForm'
import { EditIco } from '../icons/EditIco'

export function ProfileMyData() {
  const [toggleEdit, setToggleEdit] = useState(false)
  const [editDataHeight, setEditDataHeight] = useState(180)

  function toggleUserDataForm() {
    if (toggleEdit === false) {
      setEditDataHeight(244)
      setTimeout(() => {
        setToggleEdit((prevValue) => !prevValue)
      }, 500)
    } else {
      setEditDataHeight(180)
      setToggleEdit((prevValue) => !prevValue)
    }
  }

  return (
    <>
      <div
        className="profile-my-data relative transition-height  border-t border-gray-200 mt-4 pt-4"
        style={{ height: `${editDataHeight}px` }}
      >
        <h3 className="profile-label-my-data text-lg font-semibold text-gray-800 mb-2">
          My data:
        </h3>
        {toggleEdit ? (
          <UserDataForm toggleUserDataForm={toggleUserDataForm} />
        ) : (
          <MyProfileUserData />
        )}

        <div
          className="my-data-edit-btn absolute top-2 right-1 p-2 w-10 h-10 hover:bg-gray-200 hover:cursor-pointer rounded-md"
          onClick={toggleUserDataForm}
        >
          <EditIco />
        </div>
      </div>
    </>
  )
}
