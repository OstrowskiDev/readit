import { LogoIco } from '../icons/LogoIco'

export function MobileLogo() {
  return (
    <a
      className="mobile-logo w-10 h-10 mt-4 mx-2 flex justify-center items-center text-app-blue"
      href="/posts"
    >
      <LogoIco />
    </a>
  )
}
