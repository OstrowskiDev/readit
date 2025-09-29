import './shimmerStyles.css'
import { CommentShimmer } from './CommentShimmer'

export function PostCommentShimmer() {
  return (
    <div className="post-shimmer-container relative w-full">
      <div className="post-shimmer shimmer-border relative max-w-[800px] py-1 px-4 mx-auto glass-blue-soft rounded-xl ">
        {/* Post header */}
        <div className="post-shimmer-header relative right-0 flex items-center mt-3">
          <div className="shimmer avatar absolute h-12 w-12 rounded-full"></div>
          <div className="shimmer text-authors-name ml-2 h-4 w-24"></div>
          <div className="shimmer text-creation-date h-4 w-20 ml-2"></div>
          <div className="shimmer text-edit-date h-4 w-28 ml-2"></div>
        </div>

        {/* Post title */}
        <div className="shimmer text-post-title h-4 w-96 mt-6 mb-2"></div>

        {/* Post body */}
        <div className="post-content mt-10 mb-3">
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

          <div
            className="shimmer text h-3 mb-3 mt-8"
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
          <div className="post-bottom-btns-container flex justify-between items-center mt-12">
            <div className="post-shimmer-bottom-btns-left flex items-center w-full">
              <div className="shimmer-button h-10 min-w-[60px] w-full max-w-[84px] ml-0"></div>
              <div className="shimmer-button h-10 min-w-[60px] w-full max-w-[114px] ml-3"></div>
              <div className="shimmer-button h-10 min-w-[60px] w-full max-w-[120px] ml-3"></div>
              <div className="shimmer-button h-10 min-w-[60px] w-full max-w-[140px] ml-auto"></div>
            </div>
          </div>
        </div>
        <div className="post-comments flex-grow ">
          <div className="separator mt-6 border-t border-app-blue/20"></div>
          <div className="comments header shimmer h-4 w-28 ml-2 mt-4"></div>
          <div className="comment direct-child">
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
