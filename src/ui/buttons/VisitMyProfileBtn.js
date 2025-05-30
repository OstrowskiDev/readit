import { MyPostsIco } from '../icons/MyPostsIco'
import { useRouter } from 'next/navigation'

export function VisitMyProfileBtn({ authorId }) {
  const router = useRouter()

  function onFollowClick() {
    router.push(`/user/${authorId}`)
  }
  return (
    <button
      onClick={onFollowClick}
      className="visit-btn-container flex justify-center items-center btn-border-blue-strong interactive-orange-soft w-80 h-10 px-4 "
    >
      <div className="visit-btn-icon-container w-[21px]">
        <MyPostsIco className={'text-app-blue-alpha'} size={21} />
      </div>
      <p className="visit-btn-text ml-[6px] font-semibold text-app-blue-alpha">
        Visit my profile
      </p>
    </button>
  )
}
