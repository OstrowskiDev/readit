export default function NotFound() {
  return (
    <div
      className="w-full flex justify-center items-center"
      style={{ height: `calc(100vh - 72px)` }}
    >
      <div className="goodbye-container flex flex-col items-center w-full lg:w-[480px] px-8 py-5 bg-blue-500 lg:rounded-xl shadow-lg">
        <h1 className="goodbye-title below-xs:text-2xl text-3xl pt-1 font-bold text-white">
          Oops... Error 404!
        </h1>
        <h2 className="goodbye-subtitle below-xs:text-base text-xl my-1 text-white">
          Page not found!
        </h2>
      </div>
    </div>
  )
}
