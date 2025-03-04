import { ActivationFailedIco } from '../ui/icons/ActivationFailedIco'

export default function ActivationFailed() {
  return (
    <div
      className="activation-failed-page w-full bg-white flex justify-center items-center text-center"
      style={{ height: `calc(100vh - 72px)` }}
    >
      <div className="activation-failed-container w-[320px] h-[484px] p-8 pt-6 rounded-lg bg-blue-500 shadow-lg">
        <div className="activation-failed-header flex flex-col items-center mb-6">
          <div className="activation-failed-icon w-40 mb-2">
            <ActivationFailedIco />
          </div>
          <h1 className="activation-failed-title uppercase text-2xl text-white">
            Failed
          </h1>
        </div>
        <p className="activation-failed-message mt-24 text-white text-lg">
          Activation failed, try again later or contact site administrator.
        </p>
      </div>
    </div>
  )
}
