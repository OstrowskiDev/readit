import { ProfileAbout } from '../ProfileAbout'
import { ProfileMyData } from '../ProfileMyData'
import { ProfileSettings } from '../ProfileSettings'
import './shimmerStyles.css'

export function MyProfileShimmer() {
  return (
    <div className="main-container flex justify-center items-center mx-auto mt-8 px-4 w-[800px]">
      <div className="profile-container bg-white px-6 pt-3 pb-6 rounded-lg shadow-center-sm grow">
        <div className={'profile-header relative'}>
          <div className="shimmer text-header-label h-4 w-24"></div>

          <div className="profile-avatar-name flex items-center pt-4 mb-4 border-t border-gray-200">
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
        </div>
        <ProfileAbout userData={userData} setUserData={setUserData} />
        <ProfileMyData userData={userData} setUserData={setUserData} />
        <ProfileSettings />
      </div>
    </div>
  )
}
