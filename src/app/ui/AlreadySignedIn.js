export default function AlreadySignedIn() {
  return (
    <div className="min-h-screen w-full bg-white flex justify-center items-center">
      <div className="goodbye-container flex flex-col items-center bg-blue-500 px-8 py-5 rounded-xl shadow-lg">
        <h1 className="goodbye-title text-3xl pt-1 font-bold text-white">
          {"You're already logged in!"}
        </h1>
        <p className="goodbye-subtitle text-md my-1 text-white">
          How did you get in here? 🤔
        </p>
      </div>
    </div>
  )
}
