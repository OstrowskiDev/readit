import { Inter } from 'next/font/google'
import './globals.css'
import SideNav from './ui/SideNav'
import { Suspense } from 'react'
import { Loader } from './ui/Loader'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Next.js Baby Steps',
  description: 'My personal playground for learning Next.js',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="md:flex">
          <div className="w-full flex-none md:w-60">
            <SideNav />
          </div>
          {/* {children} */}
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </div>
      </body>
    </html>
  )
}

function Loading() {
  return <Loader />
}
