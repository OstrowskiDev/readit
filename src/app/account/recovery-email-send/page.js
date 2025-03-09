import { ActivationSuccessIco } from '@/app/ui/icons/ActivationSuccessIco'

export default function RecoveryEmailSend() {
  return (
    <div
      className="activation-email-page w-full bg-white flex justify-center items-center text-center"
      style={{ height: `calc(100vh - 72px)` }}
    >
      <div className="activation-email-container w-[320px] h-[484px] p-8 pt-6 rounded-lg bg-blue-500 shadow-lg">
        <div className="activation-email-header flex flex-col items-center mb-6">
          <div className="activation-email-icon w-40 mb-2">
            <ActivationSuccessIco />
          </div>
          <h1 className="activation-email-title uppercase text-2xl text-white">
            Email Sent
          </h1>
        </div>
        <p className="activation-email-message mt-24 text-white text-lg ">
          Please check your inbox and click the link to change your password.
        </p>
      </div>
    </div>
  )
}
