import { MenuIco } from './icons/MenuIco'

export function MobileMenu() {
  return (
    <div className="mobile-menu-container md:hidden w-10 h-10 p-[2px] mx-3 my-4 bg-blue-500">
      <MenuIco color="white" />
    </div>
  )
}
