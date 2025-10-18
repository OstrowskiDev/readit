'use client'

export default function SimpleCardWrapper({
  name,
  header,
  headerClasses,
  ico,
  children,
  containerClasses,
  message,
  messageClasses,
}) {
  return (
    <div
      className={`${name}-page w-full flex justify-center items-center below-lg:pb-16`}
      style={{ height: `calc(100vh - 96px)` }}
    >
      <div
        className={`${name}-container flex flex-col justify-between w-[320px] min-h-[484px] p-8 glass-blue-soft ${containerClasses}`}
      >
        <div className={`${name}-header flex flex-col items-center`}>
          {ico && (
            <div className={`${name}-icon w-40 mb-4 text-app-blue`}>{ico}</div>
          )}
          {header && (
            <h1
              className={`${name}-title uppercase text-2xl font-bold text-center whitespace-pre-line ${headerClasses}`}
            >
              {header}
            </h1>
          )}
        </div>
        {message && (
          <p
            className={`${name}-message pb-10 mt-4 text-lg whitespace-pre-line ${messageClasses}`}
          >
            {message}
          </p>
        )}
        {children}
      </div>
    </div>
  )
}
