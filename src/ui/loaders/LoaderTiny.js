import { Spinner } from './Spinner'

export function LoaderTiny() {
  return (
    <div className="fixed top-0 left-0 flex flex-col justify-center items-center w-full h-full z-20">
      <div className="flex flex-col justify-center items-center w-32 h-32 rounded-lg p-2 bg-gray-400 bg-opacity-50">
        <Spinner />
        <h1 className="text-white">Loading...</h1>
      </div>
    </div>
  )
}
