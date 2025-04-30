import { lazy, Suspense } from 'react'
import { UserInfoboxLoader } from './loaders/UserInfoboxLoader'
const LazyUserInfobox = lazy(() => import('@/app/ui/UserInfobox.js'))

export function UserInfoboxWrapper({
  authorData,
  handleMouseEnter,
  handleMouseLeave,
  isUserHovered,
}) {
  return (
    <Suspense fallback={<UserInfoboxLoader />}>
      {isUserHovered && (
        <LazyUserInfobox
          author={authorData}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
        />
      )}
    </Suspense>
  )
}
