import { useState } from 'react'
import { EditIco } from '../icons/EditIco'
import { ProfileAboutForm } from './ProfileAboutForm'

export function ProfileAbout({ userData, setUserData }) {
  const [editAbout, setEditAbout] = useState(false)
  const [buttonsHeight, setButtonsHeight] = useState('0px')

  function handleAboutFormVisibility() {
    if (editAbout === false) {
      setTimeout(() => {
        setButtonsHeight('60px')
      }, 1)
      setTimeout(() => {
        setEditAbout((prevValue) => !prevValue)
      }, 500)
    } else {
      setButtonsHeight('60px')
      setTimeout(() => {
        setButtonsHeight('0px')
      }, 16)
      setEditAbout((prevValue) => !prevValue)
    }
  }

  return (
    <div className="profile-about relative mt-4 pt-4 border-t border-gray-200 transition-height">
      <h3 className="profile-label-about text-lg font-semibold text-gray-800 mb-2">
        About me:
      </h3>
      {editAbout ? (
        <ProfileAboutForm
          userData={userData}
          setUserData={setUserData}
          handleAboutFormVisibility={handleAboutFormVisibility}
        />
      ) : (
        <>
          <p className="profile-about pb-2 pr-[10px]">{userData.about}</p>
          <div
            className="mimic-buttons-height transition-height"
            style={{ height: buttonsHeight }}
          ></div>
        </>
      )}

      <div
        className="about-edit-btn absolute top-2 right-1 p-2 w-10 h-10 hover:bg-gray-200 hover:cursor-pointer rounded-md"
        onClick={handleAboutFormVisibility}
      >
        <EditIco />
      </div>
    </div>
  )
}
