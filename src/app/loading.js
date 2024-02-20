export default function Loading() {
  return (
    <div className="absolute flex flex-col justify-center items-center w-full h-full bg-gray-500 bg-opacity-50 z-50">
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <h1 className="text-white">Loading...</h1>
    </div>
  )
}
