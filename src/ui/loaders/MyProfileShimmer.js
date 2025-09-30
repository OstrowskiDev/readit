import './shimmerStyles.css'

export function MyProfileShimmer() {
  return (
    <div className="shimmer-main-container mx-auto mt-3 md:mt-8 px-4 md:w-[800px]">
      {/* Profile preview: */}
      <div className="shimmer-profile-container md:px-6 md:pt-3 pb-6 mmd:rounded-lg md:shadow-center-sm glass-blue-soft grow">
        <div className="shimmer-profile-header-container relative">
          <div className="shimmer header h-5 w-44 mt-2 mb-3"></div>

          <div className="shimmer-profile-preview-container flex items-center pt-4 mb-4 border-t border-app-blue/30">
            <div className="shimmer avatar h-20 w-20 rounded-full"></div>
            <div className="shimmer-name-date-container flex flex-col ml-2">
              <div className="shimmer text-name h-5 w-32"> </div>
              <div className="shimmer text-creation-date mt-2 h-4 w-44"> </div>
            </div>
          </div>

          <div className="shimmer-count-container mt-4 flex">
            <div className="shimmer-posts-count-container">
              <div className="shimmer text-posts-count h-4 w-4 mt-2"></div>
              <div className="shimmer text-posts-count-label h-3 w-28 mt-3"></div>
            </div>
            <div className="shimmer-comments-count-container ml-5">
              <div className="shimmer text-comments-count h-4 w-6 my-2"></div>
              <div className="shimmer text-comments-count-label h-3 w-36 mt-3"></div>
            </div>
          </div>
        </div>

        {/* About me: */}
        <div className="shimmer-about-container mt-5 pt-3 mb-7 border-t border-app-blue/30">
          <div className="shimmer header h-5 w-24 mt-1 mb-1"></div>
          <div className="shimmer-about-me-content h-24 overflow-hidden">
            <div className="shimmer text h-4 w-11/12 mt-4 mb-[10px]"></div>
            <div className="shimmer text h-4 w-10/12 mb-[10px]"></div>
            <div className="shimmer text h-4 w-11/12 mb-[10px]"></div>
          </div>
        </div>

        {/* My data: */}
        <div className="shimmer-my-data-container relative transition-height  border-t border-app-blue/30 mt-4 pt-4">
          <div className="shimmer header h-5 w-24 mt-1 mb-3"></div>

          <div className="shimmer-user-data-container">
            <div className="shimmer-key-value-pair-container flex items-center">
              <div className="shimmer text-key h-3 w-14 mr-8 my-2 "></div>
              <div className="shimmer text-value h-3 w-5/12 ml-10 my-[10px]"></div>
            </div>
          </div>
          <div className="shimmer-user-data-container">
            <div className="shimmer-key-value-pair-container flex items-center">
              <div className="shimmer text-key h-3 w-14 mr-8 my-2 "></div>
              <div className="shimmer text-value h-3 w-6/12 ml-10 my-[10px]"></div>
            </div>
          </div>
          <div className="shimmer-user-data-container">
            <div className="shimmer-key-value-pair-container flex items-center">
              <div className="shimmer text-key h-3 w-20 mr-2 my-2 "></div>
              <div className="shimmer text-value h-3 w-9/12 ml-10 my-[10px]"></div>
            </div>
          </div>
          <div className="shimmer-user-data-container">
            <div className="shimmer-key-value-pair-container flex items-center">
              <div className="shimmer text-key h-3 w-[88px] my-2 "></div>
              <div className="shimmer text-value h-3 w-4/12 ml-10 my-[10px]"></div>
            </div>
          </div>
        </div>

        {/* Settings: */}
        <div className="shimmer-settings-container border-t border-app-blue/30 mt-[14px] mb-2 pt-4">
          <div className="shimmer header h-5 w-24 mt-1 mb-5"></div>
          <div className="shimmer text-pass-change h-3 w-40 mb-5"></div>
          <div className="shimmer text-delete-account h-3 w-32"></div>
        </div>
      </div>
    </div>
  )
}
