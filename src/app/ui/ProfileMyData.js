import { useState } from 'react'
import { MyProfileUserData } from './MyProfileUserData'
import { UserDataForm } from './UserDataForm'
import { EditIco } from './icons/EditIco'

export function ProfileMyData({ userData, setUserData }) {
  const [editData, setEditData] = useState(false)
  const [editDataHeight, setEditDataHeight] = useState(180)

  function handleUserDataFormVisibility() {
    if (editData === false) {
      setEditDataHeight(244)
      setTimeout(() => {
        setEditData((prevValue) => !prevValue)
      }, 500)
    } else {
      setEditDataHeight(180)
      setEditData((prevValue) => !prevValue)
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
        {editData ? (
          <UserDataForm
            userData={userData}
            setUserData={setUserData}
            handleUserDataFormVisibility={handleUserDataFormVisibility}
          />
        ) : (
          <MyProfileUserData userData={userData} />
        )}

        <div
          className="my-data-edit-btn absolute top-2 right-1 p-2 w-10 h-10 hover:bg-gray-200 hover:cursor-pointer rounded-md"
          onClick={handleUserDataFormVisibility}
        >
          <EditIco />
        </div>
      </div>
    </>
  )
}
