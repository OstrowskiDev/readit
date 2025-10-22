import WelcomeContent from '@/content/welcome'

export default function Root() {
  return (
    <div
      className="w-full flex justify-center items-center"
      style={{ height: `calc(100vh - 96px)` }}
    >
      <div
        className="
            welcome-container
            flex flex-col items-left justify-start 
            w-full md:w-[640px] 
            h-[320px]
            px-8 py-5 
            glass-blue-soft 
            rounded-none md:rounded-xl
            below-md:border-x-0
            shadow-lg
            overflow-y-auto blue-scrollbar"
      >
        <WelcomeContent />
      </div>
    </div>
  )
}
