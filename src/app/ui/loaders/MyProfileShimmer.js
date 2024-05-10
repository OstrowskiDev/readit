import { ProfileAbout } from '../ProfileAbout'
import { ProfileMyData } from '../ProfileMyData'
import { ProfileSettings } from '../ProfileSettings'
import './shimmerStyles.css'

export function MyProfileShimmer() {
  return (
    <div className="main-container flex justify-center items-center mx-auto mt-8 px-4 w-[800px]">
      <div className="profile-container bg-white px-6 pt-3 pb-6 rounded-lg shadow-center-sm grow">
        <div className="shimmer profile-header relative">
          <div className="shimmer text-header-label h-4 w-24"></div>

          <div className="shimmer profile-preview-container flex items-center pt-4 mb-4 border-t border-gray-200">
            <div className="shimmer avatar h-20 w-20 rounded-full"></div>
            <div className="shimmer name ml-2 h-4 w-32"> </div>
          </div>

          <div className="shimmer numbers-container mt-4 flex">
            <div className="shimmer posts-number h-3 w-5"></div>
            <div className="shimmer posts-number-label h-3 w-20"></div>
            <div className="shimmer comments-number h-3 w-5"></div>
            <div className="shimmer comments-number-label h-3 w-24"></div>
          </div>
        </div>
        <ProfileAbout userData={userData} setUserData={setUserData} />
        <ProfileMyData userData={userData} setUserData={setUserData} />
        <ProfileSettings />
      </div>
    </div>
  )
}
