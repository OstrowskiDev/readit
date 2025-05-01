import { MessageIco } from '../icons/MessageIco'

export function MessageBtn() {
  function onMessageClick() {
    //this functionality will not be implemented
  }
  return (
    <button
      onClick={onMessageClick}
      className="message-btn-container flex justify-center items-center h-10 ml-2 px-4 rounded-full bg-gray-300 hover:bg-gray-400"
    >
      <div className="btn-icon-container w-[21px]">
        <MessageIco color={'gray'} />
      </div>
      <p className="btn-text ml-[6px] font-semibold text-gray-500">Message</p>
    </button>
  )
}
