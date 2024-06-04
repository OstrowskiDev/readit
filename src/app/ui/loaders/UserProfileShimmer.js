import './shimmerStyles.css'

export function UserProfileShimmer() {
  return (
    <div className="shimmer-main-container flex justify-center items-center mx-auto mt-8 px-4 w-[800px]">
      {/* Profile preview: */}
      <div className="shimmer-profile-container bg-white px-6 pt-3 pb-6 rounded-lg shadow-center-sm grow">
        <div className="shimmer-profile-header-container relative">
          <div className="shimmer-profile-preview-container flex items-center pt-4 mb-4 border-gray-200">
            <div className="shimmer avatar h-20 w-20 rounded-full"></div>
            <div className="shimmer text-name ml-2 h-5 w-32"> </div>
          </div>

          <div className="shimmer-count-container mt-4 flex">
            <div className="shimmer-posts-count-container">
              <div className="shimmer text-posts-count h-5 w-4 my-2"></div>
              <div className="shimmer text-posts-count-label h-5 w-24"></div>
            </div>
            <div className="shimmer-comments-count-container ml-4">
              <div className="shimmer text-comments-count h-5 w-8 my-2"></div>
              <div className="shimmer text-comments-count-label h-5 w-32"></div>
            </div>
          </div>
        </div>

        {/* About me: */}
        <div className="shimmer-about-container relative mt-4 pt-4 border-t border-gray-200">
          <div className="shimmer text-label-about h-6 w-24 mt-1 mb-5"></div>
          <div className="shimmer text-about h-4 w-[600px] mb-3 mr-16"></div>
          <div className="shimmer text-about h-4 w-[540px] mb-3 mr-16"></div>
          <div className="shimmer text-about h-4 w-[580px] mb-3 mr-16"></div>
          <div className="shimmer text-about h-4 w-[340px] mb-3 mr-16"></div>
        </div>
      </div>
    </div>
  )
}
