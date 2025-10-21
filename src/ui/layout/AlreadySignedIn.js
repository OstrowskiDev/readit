export function AlreadySignedIn() {
  return (
    <div
      className="w-full flex justify-center items-center"
      style={{ height: `calc(100vh - 96px)` }}
    >
      <div
        className="
          goodbye-container  
          flex flex-col items-center 
          w-full md:w-[420px] lg:w-[520px]
          px-8 py-5 
          glass-blue-soft 
          rounded-none md:rounded-xl
          below-md:border-x-0
          shadow-lg"
      >
        <h1
          className="
          goodbye-title 
          text-xl md:text-2xl lg:text-3xl
          pt-1 
          font-bold text-app-blue-text"
        >
          {"You're already logged in!"}
        </h1>
        <p className="goodbye-subtitle text-md my-1 text-app-blue-text">
          How did you get in here? 🤔
        </p>
      </div>
    </div>
  )
}
