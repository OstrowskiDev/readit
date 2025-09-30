import ShimmerHeader from './common/ShimmerHeader'
import ShimmerKeyValuePair from './common/ShimmerKeyValuePair'
import ShimmerParagraph from './common/ShimmerParagraph'
import './shimmerStyles.css'

export function MyProfileShimmer() {
  return (
    <div className="shimmer-main-container mx-auto mt-3 md:mt-8 px-4 md:w-[800px]">
      {/* Profile preview: */}
      <div className="shimmer-profile-container md:px-6 md:pt-3 pb-6 mmd:rounded-lg md:shadow-center-sm glass-blue-soft grow">
        <div className="shimmer-profile-header-container relative">
          <ShimmerHeader width="170px" classes="mt-2 mb-3" />

          {/* User avatar */}
          <div className="shimmer-profile-preview-container flex items-center pt-4 mb-4 border-t border-app-blue/30">
            <div className="shimmer avatar h-20 w-20 rounded-full"></div>
            <div className="shimmer-name-date-container flex flex-col ml-2">
              <ShimmerHeader width="128px" />
              <ShimmerParagraph width="176px" height="12px" classes="mt-2" />
            </div>
          </div>

          {/* Post and Comment Count */}
          <div className="shimmer-count-container mt-4 flex">
            <div className="shimmer-posts-count-container">
              <ShimmerParagraph width="16px" classes="mt-2" />
              <ShimmerParagraph width="112px" height="12px" classes="mt-3" />
            </div>
            <div className="shimmer-comments-count-container ml-5">
              <ShimmerParagraph width="24px" classes="mt-2" />
              <ShimmerParagraph width="144px" height="12px" classes="mt-3" />
            </div>
          </div>
        </div>

        {/* About me: */}
        <div className="shimmer-about-container mt-5 pt-3 mb-7 border-t border-app-blue/30">
          <ShimmerHeader width={96} classes="mt-1 mb-1" />
          <div className="shimmer-about-me-content h-24 overflow-hidden">
            <ShimmerParagraph width="90%" classes="mt-4 mb-[10px]" />
            <ShimmerParagraph width="80%" classes="mb-[10px]" />
            <ShimmerParagraph width="85%" classes="mb-[10px]" />
          </div>
        </div>

        {/* My data: */}
        <div className="shimmer-my-data-container relative transition-height  border-t border-app-blue/30 mt-4 pt-4">
          <ShimmerHeader width={96} classes="mt-1 mb-3" />
          <ShimmerKeyValuePair keyW="56px" keyC="mr-8 my-2" valueW="42%" />
          <ShimmerKeyValuePair keyW="56px" keyC="mr-8 my-2" valueW="50%" />
          <ShimmerKeyValuePair keyW="80px" keyC="mr-2 my-2" valueW="75%" />
          <ShimmerKeyValuePair keyW="88px" keyC="my-2" valueW="34%" />
        </div>

        {/* Settings: */}
        <div className="shimmer-settings-container border-t border-app-blue/30 mt-[14px] mb-2 pt-4">
          <ShimmerHeader width={96} classes="mt-1 mb-5" />
          <ShimmerParagraph width="160px" height="12px" classes="mb-5" />
          <ShimmerParagraph width="128px" height="12px" />
        </div>
      </div>
    </div>
  )
}
