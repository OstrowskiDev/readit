import { useMyProfileContext } from '@/lib/context/MyProfileProvider'
import { Avatar } from '@/services/dicebear/Avatar'
import { AccountCreationDate } from '@/ui/infobox/AccountCreationDate'

export function ProfilePreview() {
  const { userData } = useMyProfileContext()
  return (
    <>
      <div className="profile-avatar-name flex items-center pt-4 md:mb-4 border-gray-200">
        <Avatar
          seed={userData.avatar.seed}
          color={userData.avatar.color}
          size={80}
          border={2}
        />
        <div className="flex flex-col ml-2">
          <p className="profile-name font-orbitron-bold text-lg">
            {userData.name}
          </p>
          <AccountCreationDate accountCreatedAt={userData.createdAt} />
        </div>
      </div>

      <div className="posts-comments-numbers-container mt-4 flex">
        <div className="posts-number">
          <p className="posts-number font-orbitron-bold text-18">
            {userData.postsSum}
          </p>
          <p className="font-orbitron text-app-blue-text/50 text-14">
            Posts Created
          </p>
        </div>
        <div className="comments-number ml-4">
          <p className="comments-number font-orbitron-bold text-18 font-semibold">
            {userData.commentsSum}
          </p>
          <p className="font-orbitron text-app-blue-text/50 text-14">
            Comment Created
          </p>
        </div>
      </div>
    </>
  )
}
