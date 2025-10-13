import ShimmerHeader from './common/ShimmerHeader'
import { Loader } from './Loader'
import { PostShimmer } from './PostShimmer'
import { UserProfileShimmer } from './UserProfileShimmer'

export default function UserProfilePageShimmer() {
  return (
    <div className="shimmer-container max-w-[800px] w-full min-w-[520px] px-4">
      <UserProfileShimmer />
      <div className="user-posts-shimmer mt-7">
        <ShimmerHeader width="280px" height="24px" />
        <div className="search-container flex flex-row mt-2 mb-6">
          <div className="search-bar-shimmer shimmer h-10 w-full rounded-md"></div>
          <div className="search-bar-shimmer shimmer h-10 w-24 mx-2 rounded-md"></div>
        </div>
        <PostShimmer />
        <PostShimmer />
      </div>
      <div className="loader-position-adjuster mt-8">
        <Loader />
      </div>
    </div>
  )
}
