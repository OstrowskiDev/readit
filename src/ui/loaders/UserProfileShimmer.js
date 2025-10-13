import ShimmerHeader from './common/ShimmerHeader'
import ShimmerParagraph from './common/ShimmerParagraph'
import './shimmerStyles.css'

export function UserProfileShimmer() {
  return (
    <div className="shimmer-main-container flex flex-col justify-center items-center mt-8 w-full">
      {/* Profile preview: */}

      <div className="shimmer-profile-container glass-blue-soft md:max-w-[768px] w-full h-[480px] px-4 pt-4 pb-6 rounded-lg shadow-center-sm">
        <ShimmerHeader width="280px" height="24px" classes="mb-4 mb-3" />

        <div className="shimmer-profile-header-container relative">
          <div className="shimmer-profile-header flex items-center mb-4 border-gray-200">
            <div className="shimmer avatar h-20 w-20 rounded-full"></div>
            <div className="shimmer-name-date-container flex flex-col ml-2">
              <ShimmerParagraph width="128px" height="20px" />
              <ShimmerParagraph width="176px" classes="mt-2" />
            </div>
          </div>

          <div className="shimmer-user-data mt-7">
            <div className="shimmer-profession flex flex-row my-2">
              <ShimmerParagraph width="94px" />
              <ShimmerParagraph width="240px" classes=" ml-1" />
            </div>

            <div className="shimmer-organization flex flex-row my-[14px]">
              <ShimmerParagraph width="104px" />
              <ShimmerParagraph width="180px" classes=" ml-1" />
            </div>

            <div className="shimmer-posts-count flex flex-row my-[14px]">
              <ShimmerParagraph width="120px" />
              <ShimmerParagraph width="24px" classes=" ml-1" />
            </div>

            <div className="shimmer-comments-count flex flex-row my-[14px]">
              <ShimmerParagraph width="160px" />
              <ShimmerParagraph width="24px" classes=" ml-1" />
            </div>
          </div>
        </div>

        {/* About me: */}
        <div className="shimmer-about-container mt-6 pt-4">
          <ShimmerHeader width="100px" height="24px" classes="mt-1 mb-4" />
          <ShimmerParagraph width="90%" classes="mb-2 mr-16" />
          <ShimmerParagraph width="80%" classes="mb-2 mr-16" />
          <ShimmerParagraph width="70%" classes="mb-2 mr-16" />
          <ShimmerParagraph width="86%" classes="mb-2 mr-16" />
        </div>
      </div>
    </div>
  )
}
