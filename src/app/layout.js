import { Inter } from 'next/font/google'
import './globals.css'
import AppLayout from './ui/AppLayout'
import { getServerSession } from 'next-auth'
import SessionProvider from '@/app/lib/SessionProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ReadIt',
  description:
    'A partial clone of popular social media platform Reddit. Created for fun and educational purposes.',
}

export default async function RootLayout({ children }) {
  const session = await getServerSession()
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <div className="md:flex">
            <div className="w-full flex-none md:w-60">
              <AppLayout />
            </div>
            {children}
          </div>
        </SessionProvider>
      </body>
    </html>
  )
}
