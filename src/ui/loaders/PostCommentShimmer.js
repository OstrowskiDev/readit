import './shimmerStyles.css'
import { CommentShimmer } from './CommentShimmer'
import ShimmerParagraph from './common/ShimmerParagraph'
import ShimmerHeader from './common/ShimmerHeader'

export function PostCommentShimmer({ hasImg }) {
  return (
    <div className="post-shimmer-container relative w-full">
      <div className="post-shimmer shimmer-border relative max-w-[800px] py-1 px-4 mx-auto glass-blue-soft rounded-md ">
        {/* Post header */}
        <div className="post-shimmer-header relative right-0 flex items-center mt-3">
          <div className="shimmer avatar absolute h-12 w-12 rounded-full"></div>
          <ShimmerParagraph width="120px" height="16px" classes="ml-2" />
          <ShimmerParagraph width="80px" height="16px" classes="ml-2" />
          <ShimmerParagraph width="100px" height="16px" classes="ml-2" />
        </div>

        {/* Post title */}
        <div className="shimmer text-post-title h-6 w-[420px] mt-5 mb-5"></div>

        {hasImg && (
          <div className="shimmer aspect-[16/9] h-full w-full overflow-hidden rounded-md z-0"></div>
        )}

        {/* Post body */}
        <div className="post-content mt-5 mb-3">
          <ShimmerHeader width="200px" classes="mb-5" />
          <ShimmerParagraph width="100%" classes="mb-3" />
          <ShimmerParagraph width="calc(100% - 34px)" classes="mb-3 h-3" />
          <ShimmerParagraph width="calc(100% - 94px)" classes="mb-3 h-3" />
          <ShimmerParagraph width="calc(100% - 14px)" classes="mb-3 h-3" />
          <ShimmerParagraph width="calc(100% - 164px)" classes="mb-3 h-3" />
          <ShimmerParagraph width="calc(100% - 284px)" classes="mb-3 h-3" />
          <ShimmerParagraph width="100%" classes="mb-3" />
          <ShimmerParagraph width="calc(100% - 34px)" classes="mb-3 h-3" />
          <ShimmerParagraph width="calc(100% - 94px)" classes="mb-3 h-3" />
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
