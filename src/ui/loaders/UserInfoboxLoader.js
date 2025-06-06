import { Spinner } from './Spinner'

export function UserInfoboxLoader() {
  return (
    <div className="infobox-container absolute top-16 left-3 w-[350px] h-[260px] z-40 p-8 flex flex-col justify-center items-center glass-blue-soft rounded-xl drop-shadow-2xl hover:cursor-default">
      <Spinner />
      <h2 className="text-app-blue-text">Loading...</h2>
    </div>
  )
}
