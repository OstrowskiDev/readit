import { MenuIco } from '../icons/MenuIco'

export function MobileMenu({ setToggleCollapse }) {
  function handleClick() {
    setToggleCollapse((prev) => !prev)
  }

  return (
    <div
      className="mobile-menu-container lg:hidden w-10 h-10 p-[2px] mx-3 my-4 hover:cursor-pointer"
      onClick={handleClick}
    >
      <MenuIco className="text-app-blue" />
    </div>
  )
}
