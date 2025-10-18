import SessionProvider from '@/lib/SessionProvider'
import AppLayout from '@/ui/layout/AppLayout'
import { getServerSession } from 'next-auth'
import { Inter, Orbitron, Rubik } from 'next/font/google'
import { authOptions } from './api/auth/[...nextauth]/authOptions'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const rubik = Rubik({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  variable: '--font-rubik',
})

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-orbitron',
})

export const metadata = {
  title: 'ReadIt',
  description:
    'A partial clone of popular social media platform Reddit. Created for fun and educational purposes.',
}

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions)
  return (
    <html
      lang="en"
      className="overflow-y-auto md:overflow-y-scroll blue-scrollbar"
    >
      <body
        className={`${rubik.variable} ${orbitron.variable} ${inter.variable}`}
      >
        <SessionProvider session={session}>
          <AppLayout>{children}</AppLayout>
        </SessionProvider>
      </body>
    </html>
  )
}
