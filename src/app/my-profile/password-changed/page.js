import Link from 'next/link'
import { ActivationSuccessIco } from '@/ui/icons/ActivationSuccessIco'

export default function PasswordChanged() {
  return (
    <div
      className="password-changed-page w-full bg-white flex justify-center items-center text-center"
      style={{ height: `calc(100vh - 72px)` }}
    >
      <div className="password-changed-container flex flex-col justify-between w-[320px] h-[484px] p-8 pt-6 rounded-lg bg-blue-500 shadow-lg">
        <div className="password-changed-header flex flex-col items-center mb-6">
          <div className="password-changed-icon w-40 mb-2">
            <ActivationSuccessIco />
          </div>
          <h1 className="password-changed-title uppercase text-2xl text-white">
            Success
          </h1>
        </div>

        <p className="password-changed-message text-white text-lg">
          Congratulations, your password has been changed successfully!
        </p>
        <Link href="/my-profile">
          <button
            className="w-full h-12 mt-6 bg-white text-blue-500 py-2 rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 font-bold active:bg-blue-200 hover:text-lg"
            type="button"
          >
            Back to my profile
          </button>
        </Link>
      </div>
    </div>
  )
}
