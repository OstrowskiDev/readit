import { useState } from 'react'
import { EditIco } from './icons/EditIco'
import { ProfilePreview } from './ProfilePreview'
import { ProfileAvatarSelection } from './ProfileAvatarSelection'

export function ProfileHeader({ userData, setUserData }) {
  const [editAvatar, setEditAvatar] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  function handleAvatarEdit() {
    setIsCollapsed(true)
    setTimeout(() => {
      setIsCollapsed(false)
      setEditAvatar((prevValue) => !prevValue)
    }, 1000)
  }
  return (
    <>
      <div
        className={
          'profile-header relative transition-all duration-1000  overflow-hidden ' +
          `${isCollapsed ? 'max-h-10' : 'max-h-[1000px]'}`
        }
      >
        <div
          className="avatar-edit-btn absolute top-[-6px] right-1 p-2 w-10 h-10 hover:bg-gray-200 hover:cursor-pointer rounded-md"
          onClick={handleAvatarEdit}
        >
          <EditIco />
        </div>
        <h3
          className={
            'profile-label-about text-lg py-1 font-semibold text-gray-800 mb-1 transition-opacity duration-1000 ' +
            `${isCollapsed ? 'opacity-0' : 'opacity-100'}`
          }
        >
          {!editAvatar ? 'Profile preview:' : 'Create your new avatar:'}
        </h3>
        {editAvatar ? (
          <ProfileAvatarSelection
            userData={userData}
            setUserData={setUserData}
          />
        ) : (
          <ProfilePreview userData={userData} />
        )}
      </div>
    </>
  )
}
