import { AboutIco } from './icons/AboutIco'
import { CreditsIco } from './icons/CreditsIco'
import { MyPostsIco } from './icons/MyPostsIco'
import { RecentIco } from './icons/RecentIco'
import StarIco from './icons/StarIco'

export function MobileCollapseMenu() {
  function Separator() {
    return <div className="separator h-[2px] bg-gray-300"></div>
  }
  return (
    <div className="recent mobile-menu absolute flex flex-col top-[72px] left-0 w-[320px] z-10">
      <a href="/posts" className="mobile-nav-button">
        <RecentIco color={'rgb(55 65 81)'} size={20} />
        <p className="recent-title ml-2">Recent</p>
      </a>
      <Separator />
      <a className="favorites mobile-nav-button" href="/posts/favorites">
        <StarIco color={'rgb(55 65 81)'} size={20} />
        <p className="favorites-title ml-2">Favorites</p>
      </a>
      <Separator />
      <a className="my-posts mobile-nav-button" href="/posts/my-posts">
        <MyPostsIco color={'rgb(55 65 81)'} size={20} />
        <p className="my-posts-title ml-2">My posts</p>
      </a>
      <Separator />
      <a className="about mobile-nav-button " href="/posts/post/about">
        <AboutIco color={'rgb(55 65 81)'} size={20} />
        <p className="about-title ml-2">About</p>
      </a>
      <Separator />
      <a className="credits mobile-nav-button" href="/posts/post/credits">
        <CreditsIco color={'rgb(55 65 81)'} size={20} />
        <p className="credits-title ml-2">Credits</p>
      </a>
    </div>
  )
}
