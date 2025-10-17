import { AboutIco } from '../icons/AboutIco'
import { CreditsIco } from '../icons/CreditsIco'
import { MyPostsIco } from '../icons/MyPostsIco'
import { RecentIco } from '../icons/RecentIco'
import StarIco from '../icons/StarIco'

export function MobileCollapseMenu() {
  function Separator({ gap }) {
    return (
      <div
        className="separator h-[1px] bg-app-blue"
        style={{ margin: `0 ${gap}px` }}
      ></div>
    )
  }
  return (
    <div
      className="mobile-menu btn-orbitron uppercase fixed flex flex-col top-[72px] left-0 w-[320px] p-4 z-10 glass-blue-mobile-menu"
      style={{ height: `calc(100vh - 72px)` }}
    >
      <h3 className="mobile-nav-label px-2 pt-2 tracking-widest font-semibold text-app-blue-text text-center">
        Posts:
      </h3>
      <a href="/posts" className="recent mobile-nav-button btn-color-hover">
        <RecentIco className="text-app-blue-text" size={20} />
        <p className="recent-title ml-3 mt-[3px]">Recent</p>
      </a>
      <a
        className="favorites mobile-nav-button btn-color-hover"
        href="/posts/favorites"
      >
        <StarIco className="text-app-blue-text" size={20} />
        <p className="favorites-title ml-3 mt-[3px]">Favorites</p>
      </a>
      <a
        className="my-posts mobile-nav-button btn-color-hover"
        href="/posts/my-posts"
      >
        <MyPostsIco className="text-app-blue-text" size={20} />
        <p className="my-posts-title ml-3 mt-[3px]">My posts</p>
      </a>

      <Separator gap={12} />

      <h3 className="mobile-nav-label px-2 pt-5 tracking-widest font-semibold text-app-blue-text text-center">
        App:
      </h3>

      <a
        className="about mobile-nav-button btn-color-hover "
        href="/posts/post/about"
      >
        <AboutIco className="text-app-blue-text" size={20} />
        <p className="about-title ml-3 mt-[3px]">About</p>
      </a>
      <a
        className="credits mobile-nav-button btn-color-hover"
        href="/posts/post/credits"
      >
        <CreditsIco className="text-app-blue-text" size={20} />
        <p className="credits-title ml-3 mt-[3px]">Credits</p>
      </a>

      <Separator gap={12} />

      <h3 className="mobile-nav-label px-2 pt-5 tracking-widest font-semibold text-app-blue-text text-center">
        User account:
      </h3>
      <a
        className="about mobile-nav-button btn-color-hover "
        href="/my-profile"
      >
        <MyPostsIco className="text-app-blue-text" size={20} />
        <p className="about-title ml-3 mt-[3px]">My profile</p>
      </a>
    </div>
  )
}
