export default function NotFound() {
  return (
    <div
      className="not-found w-full flex justify-center items-center"
      style={{ height: `calc(100vh - 96px)` }}
    >
      <div
        className="
            not-found-container 
            flex flex-col items-center 
            w-full md:w-[480px] 
            px-8 py-5 
            glass-blue-soft 
            rounded-none md:rounded-xl
            below-md:border-x-0
            shadow-lg"
      >
        <h1 className="not-found-title below-xs:text-2xl text-3xl pt-1 font-bold text-white">
          Oops... Error 404!
        </h1>
        <h2 className="not-found-subtitle below-xs:text-base text-xl my-1 text-white">
          Page not found!
        </h2>
      </div>
    </div>
  )
}
