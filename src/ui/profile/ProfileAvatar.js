import { useMyProfileContext } from '@/lib/context/MyProfileProvider'
import { Avatar } from '@/services/dicebear/Avatar'
import { AccountCreationDate } from '@/ui/infobox/AccountCreationDate'

export function ProfileAvatar() {
  const { userData } = useMyProfileContext()
  return (
    <>
      <div className="profile-avatar-name flex items-center pt-4 md:mb-4 border-gray-200">
        <Avatar
          seed={userData.avatar.seed}
          color={userData.avatar.color}
          size={80}
          border={3}
        />
        <div className="flex flex-col ml-2">
          <p className="profile-name font-orbitron-bold text-app-strongorange text-lg">
            {userData.name}
          </p>
          <AccountCreationDate accountCreatedAt={userData.createdAt} />
        </div>
      </div>
    </>
  )
}
