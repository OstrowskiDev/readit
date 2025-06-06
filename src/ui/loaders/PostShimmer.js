import { ShimmerArc } from './ShimmerArc'
import './shimmerStyles.css'

export function PostShimmer() {
  return (
    <div className="post-shimmer-container relative w-full">
      <div className="post-shimmer shimmer-border glass-blue-soft relative flex flex-col justify-between h-[400px] py-1 px-4 md:my-4">
        {/* Post shimmer border */}
        <div className="shimmer-border-line horizontal-top"></div>
        <div className="shimmer-border-line horizontal-bottom"></div>
        <div className="shimmer-border-line vertical-left"></div>
        <div className="shimmer-border-line vertical-right"></div>
        <ShimmerArc
          radius={10}
          strokeWidth={1}
          className="shimmer-arc top-right below-md:hidden"
        />
        <ShimmerArc
          radius={10}
          strokeWidth={1}
          className="shimmer-arc top-left below-md:hidden"
        />
        <ShimmerArc
          radius={10}
          strokeWidth={1}
          className="shimmer-arc bottom-right below-md:hidden"
        />
        <ShimmerArc
          radius={10}
          strokeWidth={1}
          className="shimmer-arc bottom-left below-md:hidden"
        />

        {/* Post header */}
        <div className="post-shimmer-header relative right-0 flex items-center mt-3">
          <div className="shimmer avatar absolute h-9 w-9 rounded-full"></div>
          <div className="shimmer text-authors-name ml-2 h-4 w-24"></div>
          <div className="shimmer text-date h-4 w-16 ml-2"></div>
        </div>

        {/* Post title */}
        <div className="shimmer text-post-title h-6 w-64 my-4 py-2"></div>

        {/* Post body */}
        <div className="post-content mb-2">
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
          <div className="post-bottom-btns-container flex justify-between items-center py-2">
            <div className="post-shimmer-bottom-btns-left flex items-center w-full gap-3">
              <div className="shimmer button h-10 min-w-[60px] w-full max-w-[88px] ml-0 rounded-md"></div>
              <div className="shimmer button h-10 min-w-[60px] w-full max-w-[100px] rounded-md"></div>
              <div className="shimmer button h-10 min-w-[60px] w-full max-w-[105px] rounded-md"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
