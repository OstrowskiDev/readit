import { ActivationSuccessIco } from '@/ui/icons/ActivationSuccessIco'

export default function AccountDeletedPage() {
  return (
    <div
      className="account-deleted-page w-full bg-white flex justify-center items-center text-center"
      style={{ height: `calc(100vh - 72px)` }}
    >
      <div className="account-deleted-container w-[320px] h-[484px] p-6 pt-6 rounded-lg bg-blue-500 shadow-lg">
        <div className="account-deleted-header flex flex-col items-center">
          <div className="account-deleted-icon w-40 mb-2">
            <ActivationSuccessIco />
          </div>
          <h1 className="account-deleted-title uppercase text-2xl font-bold text-white">
            Account Deleted
          </h1>
        </div>
        <p className="account-deleted-message mt-8 font-bold text-white">
          Your account has been successfully deleted as requested
        </p>
        <p className="account-deleted-message mt-8 text-white text-base">
          All personal information has been permanently removed. Thank you for
          your interest in our application and for being with us.
        </p>
      </div>
    </div>
  )
}
