import { useState } from 'react'
import { EditIco } from './icons/EditIco'
import { ProfilePreview } from './ProfilePreview'
import { ProfileAvatarSelection } from './ProfileAvatarSelection'

export function ProfileHeader({ userData, setUserData }) {
  const [editAvatar, setEditAvatar] = useState(false)

  function handleAvatarEdit() {
    setEditAvatar((prevValue) => !prevValue)
  }
  return (
    <>
      <div className="profile-header relative">
        <div
          className="avatar-edit-btn absolute top-[-10px] right-1 p-2 w-10 h-10 hover:bg-gray-200 hover:cursor-pointer rounded-md"
          onClick={handleAvatarEdit}
        >
          <EditIco />
        </div>
        <h3 className="profile-label-about text-lg font-semibold text-gray-800 mb-1">
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
