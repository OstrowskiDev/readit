import './shimmerStyles.css'

export function PostShimmer() {
  return (
    <div className="post-shimmer-container relative w-full">
      <div className="post-shimmer shimmer-border glass-blue-soft relative h-[398px] py-1 px-4 md:my-4 rounded-md">
        {/* Post header */}
        <div className="post-shimmer-header relative right-0 flex items-center mt-1">
          <div className="shimmer avatar absolute h-8 w-8 rounded-full"></div>
          <div className="shimmer text-authors-name ml-2 h-4 w-24"></div>
          <div className="shimmer text-creation-date h-4 w-20 ml-2"></div>
          <div className="shimmer text-edit-date h-4 w-28 ml-2"></div>
        </div>

        {/* Post title */}
        <div className="shimmer text-post-title h-4 w-96 mt-4 mb-2"></div>

        {/* Post body */}
        <div className="post-content mt-8 mb-3">
          <div
            className="shimmer text h-3 mt-2 mb-3"
            style={{ width: '100%' }}
          ></div>
          <div
            className="shimmer text h-3 mb-3"
            style={{ width: 'calc(100% - 34px)' }}
          ></div>
          <div
            className="shimmer text h-3 mb-3"
            style={{ width: 'calc(100% - 94px)' }}
          ></div>
          <div
            className="shimmer text h-3 mb-3"
            style={{ width: 'calc(100% - 14px)' }}
          ></div>
          <div
            className="shimmer text h-3 mb-3"
            style={{ width: 'calc(100% - 164px)' }}
          ></div>
          <div
            className="shimmer text h-3 mb-3"
            style={{ width: 'calc(100% - 284px)' }}
          ></div>

          <div
            className="shimmer text h-3 mb-3 mt-6"
            style={{ width: '100%' }}
          ></div>
          <div
            className="shimmer text h-3 mb-3"
            style={{ width: 'calc(100% - 34px)' }}
          ></div>
          <div
            className="shimmer text h-3 mb-3"
            style={{ width: 'calc(100% - 94px)' }}
          ></div>
        </div>

        {/* Post footer */}
        <div className="post-bottom-container">
          <div className="post-bottom-btns-container flex justify-between items-center mt-6">
            <div className="post-shimmer-bottom-btns-left flex items-center w-full">
              <div className="shimmer-button h-10 min-w-[60px] w-full max-w-[84px] ml-0"></div>
              <div className="shimmer-button h-10 min-w-[60px] w-full max-w-[114px] ml-3"></div>
              <div className="shimmer-button h-10 min-w-[60px] w-full max-w-[120px] ml-3"></div>
              <div className="shimmer-button h-10 min-w-[60px] w-full max-w-[140px] ml-auto"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
