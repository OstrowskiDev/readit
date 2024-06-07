import { MenuIco } from './icons/MenuIco'

export function MobileMenu({ setToggleCollapse }) {
  function handleClick() {
    setToggleCollapse((prev) => !prev)
  }

  return (
    <div
      className="mobile-menu-container md:hidden w-10 h-10 p-[2px] mx-3 my-4 bg-blue-500 hover:cursor-pointer"
      onClick={handleClick}
    >
      <MenuIco color="white" />
    </div>
  )
}
