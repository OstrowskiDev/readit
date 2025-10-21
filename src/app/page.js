export default function Root() {
  return (
    <div
      className="w-full flex justify-center items-center"
      style={{ height: `calc(100vh - 96px)` }}
    >
      <div
        className="            
            flex flex-col items-center justify-center 
            w-full md:w-[480px] 
            h-32
            px-8 py-5 
            glass-blue-soft 
            rounded-none md:rounded-xl
            below-md:border-x-0
            shadow-lg"
      >
        <h1 className="text-2xl font-semibold text-white">
          Welcome to ReadIt app!
        </h1>
      </div>
    </div>
  )
}
