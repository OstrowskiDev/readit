import { Spinner } from './Spinner'

export function Loader() {
  return (
    <div className="fixed top-0 left-0 flex flex-col justify-center items-center w-full h-full bg-gray-300 bg-opacity-50 z-20">
      <Spinner />
      <h1 className="text-white">Loading...</h1>
    </div>
  )
}
