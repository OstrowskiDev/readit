import { CommentShimmer } from './CommentShimmer'

export function PostCommentShimmer() {
  return (
    <div className="relative w-full">
      <div className="post-shimmer shimmer-border relative flex flex-col justify-between py-1 px-4 my-4 bg-white rounded-md ">
        {/* Post shimmer border */}
        <div className="shimmer-border-line horizontal-top"></div>
        <div className="shimmer-border-line horizontal-bottom"></div>
        <div className="shimmer-border-line vertical-left"></div>
        <div className="shimmer-border-line vertical-right"></div>
        <div className="shimmer-border-circle top-right"></div>
        <div className="shimmer-border-circle top-left"></div>
        <div className="shimmer-border-circle bottom-right"></div>
        <div className="shimmer-border-circle bottom-left"></div>

        {/* Post header */}
        <div className="post-shimmer-header relative right-0 flex items-center mt-3">
          <div className="shimmer avatar absolute h-9 w-9 rounded-full"></div>
          <div className="shimmer text-authors-name ml-2 h-4 w-24"></div>
          <div className="shimmer text-date h-4 w-16 ml-2"></div>
        </div>

        {/* Post title */}
        <div className="shimmer text-post-title h-6 w-64 my-4 py-2"></div>

        {/* Post body */}
        <div className="post-body-text mb-2">
          <div
            className="shimmer text h-3 mb-3"
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
        </div>

        {/* Post footer */}
        <div className="post-bottom-container">
          <div className="post-bottom-btns-container flex justify-between items-center py-2">
            <div className="post-shimmer-bottom-btns-left flex items-center gap-3">
              <div className="shimmer button h-10 w-[88px] ml-0 rounded-md"></div>
              <div className="shimmer button h-10 w-[100px] rounded-md"></div>
              <div className="shimmer button h-10 w-[105px] rounded-md"></div>
            </div>
          </div>
        </div>
        <div className="post-comments flex-grow">
          <div className="comment direct-child ml-4">
            <CommentShimmer />
          </div>
          <div className="comment grandchild ml-12">
            <CommentShimmer />
          </div>
        </div>
      </div>
    </div>
  )
}
