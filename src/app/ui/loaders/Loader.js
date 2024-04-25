import { Spinner } from './Spinner'

export function Loader() {
  return (
    <>
      <div className="fixed top-0 left-0 bg-gray-200 bg-opacity-25 w-full h-full z-20"></div>
      <div className="fixed top-0 left-0 flex flex-col justify-center items-center w-full h-full z-10">
        <div className="md:ml-[240px]">
          <Spinner />
          <h1 className="text-blue-500">Loading...</h1>
        </div>
      </div>
    </>
  )
}
