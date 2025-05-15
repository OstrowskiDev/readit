import { LogoIco } from '../icons/LogoIco'

export function DesktopLogo() {
  return (
    <div className="desktop-logo-container bg-blue-500 rounded-md shadow-md">
      <div className="desktop-logo-icon w-48 h-48 m-4 flex justify-center items-center">
        <LogoIco />
      </div>
    </div>
  )
}
