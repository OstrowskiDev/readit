import { useState } from 'react'
import { EditIco } from '../icons/EditIco'
import { ProfilePreview } from './ProfilePreview'
import { ProfileAvatarSelection } from './ProfileAvatarSelection'

export function ProfileHeader({ userData }) {
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
          'profile-header relative transition-all duration-1000  overflow-hidden will-change-max-height ' +
          `${isCollapsed ? 'max-h-10' : 'max-h-[2000px]'}`
        }
      >
        <div
          className="avatar-edit-btn absolute top-[-6px] right-1 p-2 w-10 h-10 interactive-orange-text hover:cursor-pointer"
          onClick={handleAvatarEdit}
        >
          <EditIco className={'text-app-blue-alpha/70'} />
        </div>
        <h3
          className={
            'profile-label-about text-lg py-1 font-semibold text-app-blue-alpha mb-1 transition-opacity duration-1000 ' +
            `${isCollapsed ? 'opacity-0' : 'opacity-100'}`
          }
        >
          {!editAvatar ? 'Profile preview:' : 'Create your new avatar:'}
        </h3>
        <div className="profile-separator border-t border-app-blue-alpha/50"></div>
        {editAvatar ? (
          <ProfileAvatarSelection handleAvatarEdit={handleAvatarEdit} />
        ) : (
          <ProfilePreview />
        )}
      </div>
    </>
  )
}
