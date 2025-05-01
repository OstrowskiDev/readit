import { Inter } from 'next/font/google'
import './globals.css'
import { getServerSession } from 'next-auth'
import SessionProvider from '@/lib/SessionProvider'
import { authOptions } from './api/auth/[...nextauth]/authOptions'
import AppLayout from './ui/layout/AppLayout'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ReadIt',
  description:
    'A partial clone of popular social media platform Reddit. Created for fun and educational purposes.',
}

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions)
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <AppLayout>{children}</AppLayout>
        </SessionProvider>
      </body>
    </html>
  )
}
