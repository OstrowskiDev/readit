import { Spinner } from './Spinner'

export function Loader() {
  console.log('Suspense activated!')
  return (
    <div className="absolute flex flex-col justify-center items-center w-full h-full bg-gray-500 bg-opacity-50 z-50">
      <Spinner />
      <h1 className="text-white">Loading...</h1>
    </div>
  )
}
