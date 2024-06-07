export function MobileCollapseMenu() {
  return (
    <div className="mobile-menu absolute flex flex-col top-[72px] left-0 w-[320px] z-10">
      <a href="/posts" className="mobile-nav-button ">
        Recent
      </a>
      <div className="separator h-[2px] bg-gray-300"></div>
      <a href="/posts/favorites" className="mobile-nav-button">
        Favorites
      </a>
      <div className="separator h-[2px] bg-gray-300"></div>
      <a href="/posts/my-posts" className="mobile-nav-button">
        My posts
      </a>
      <div className="separator h-[2px] bg-gray-300"></div>

      <a href="/posts/post/about" className="mobile-nav-button ">
        About
      </a>
      <div className="separator h-[2px] bg-gray-300"></div>
      <a href="/posts/post/credits" className="mobile-nav-button ">
        Credits
      </a>
    </div>
  )
}
