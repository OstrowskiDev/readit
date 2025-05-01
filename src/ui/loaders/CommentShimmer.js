import './shimmerStyles.css'

export function CommentShimmer() {
  return (
    <div className="comment-shimmer shimmer-border relative flex flex-col justify-between w-full py-1 px-4 my-4 bg-white rounded-md ">
      {/* comment header */}
      <div className="comment-shimmer-header relative right-0 flex items-center mt-3">
        <div className="shimmer avatar absolute h-12 w-12 rounded-full"></div>
        <div className="shimmer text-authors-name ml-2 h-4 w-24"></div>
        <div className="shimmer text-date h-4 w-16 ml-2"></div>
      </div>

      {/* comment title */}
      <div className="shimmer text-comment-title h-6 min-w-20 w-full max-w-64 my-4 py-2"></div>

      {/* comment body */}
      <div className="comment-body-text mb-2">
        <div className="shimmer text h-3 mb-3" style={{ width: '100%' }}></div>
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
      </div>
    </div>
  )
}
