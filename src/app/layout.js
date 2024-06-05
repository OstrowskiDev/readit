import { Inter } from 'next/font/google'
import './globals.css'
import SideNav from './ui/SideNav'
import { getServerSession } from 'next-auth'
import SessionProvider from '@/app/lib/SessionProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ReactClone app',
  description:
    'A clone of the popular social media platform Reddit. Created for fun and educational purposes.',
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
