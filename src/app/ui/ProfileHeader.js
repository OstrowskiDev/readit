import Avatar from '../lib/avatars/Avatar'
import { EditIco } from './icons/EditIco'

export function ProfileHeader({ userData }) {
  return (
    <>
      <div className="profile-header relative">
        <div className="profile-avatar-name flex items-center mb-4">
          <Avatar
            seed={userData.avatar.seed}
            color={userData.avatar.color}
            size={80}
            border={2}
          />
          <p className="profile-name ml-2 text-lg font-semibold text-gray-800">
            {userData.name}
          </p>
        </div>
        <div className="avatar-edit-btn absolute top-1 right-1 p-2 w-10 h-10 hover:bg-gray-200 hover:cursor-pointer rounded-md">
          <EditIco />
        </div>
      </div>

      <div className="posts-comments-numbers-container mt-4 flex">
        <div className="posts-number">
          <p className="posts-number text-gray-950 text-18 font-semibold ">
            {userData.postsSum}
          </p>
          <p className=" text-gray-600 text-15">Posts Created</p>
        </div>
        <div className="comments-number ml-4">
          <p className="text-gray-950 text-18 font-semibold">
            {userData.commentsSum}
          </p>
          <p className="text-gray-600 text-15">Comment Created</p>
        </div>
      </div>
    </>
  )
}
