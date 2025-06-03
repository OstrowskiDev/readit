import { LogoIco } from '../icons/LogoIco'

export function DesktopLogo() {
  return (
    <div className="desktop-logo-container glass-blue-soft mt-6 rounded-md shadow-md">
      <div className="desktop-logo-icon w-48 h-48 m-4 flex justify-center items-center">
        <LogoIco className={'text-app-blue-text'} />
      </div>
    </div>
  )
}
