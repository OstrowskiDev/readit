import { lazy, Suspense } from 'react'
import { UserInfoboxLoader } from '@/ui/loaders/UserInfoboxLoader'
const LazyUserInfobox = lazy(() => import('@/ui/infobox/UserInfobox.js'))

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
