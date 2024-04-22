import { Inter } from 'next/font/google'
import './globals.css'
import SideNav from './ui/SideNav'
import { getServerSession } from 'next-auth'
import SessionProvider from '@/app/lib/SessionProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Next.js Baby Steps',
  description: 'My personal playground for learning Next.js',
}

export default async function RootLayout({ children }) {
  const session = await getServerSession()
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <div className="md:flex">
            <div className="w-full flex-none md:w-60">
              <SideNav />
            </div>
            {children}
          </div>
        </SessionProvider>
      </body>
    </html>
  )
}
