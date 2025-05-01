import { SpinnerGray } from './SpinnerGray'

export function UserInfoboxLoader() {
  return (
    <div className="infobox-container absolute top-16 left-3 w-[350px] h-[260px] z-40 p-8 flex flex-col justify-center items-center bg-white rounded-3xl drop-shadow-2xl hover:cursor-default">
      <SpinnerGray />
      <h2 className="text-gray-600">Loading...</h2>
    </div>
  )
}
