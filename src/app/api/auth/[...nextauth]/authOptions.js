import CredentialsProvider from 'next-auth/providers/credentials'
import { getUserByEmail } from '@/app/lib/db'
import bcrypt from 'bcrypt'

export const authOptions = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    jwt({ token, user, trigger, session }) {
      if (user) {
        token.userId = user._id
        token.name = user.name
        token.avatar = user.avatar
      }
      if (trigger === 'update' && session.avatar) {
        token.avatar = session.avatar
      }
      if (trigger === 'update' && session.name) {
        token.name = session.name
      }
      return token
    },
    session({ session, token }) {
      session.user.id = token.userId
      session.user.name = token.name
      session.user.avatar = token.avatar
      //!!!
      console.log(`inside authOptions, session: ${new Date().toISOString()}`)
      return session
    },
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email:',
          type: 'text',
        },
        password: {
          label: 'Password:',
          type: 'password',
        },
      },
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) return null

        const user = await getUserByEmail(credentials.email)
        if (!user) return null

        const match = await bcrypt.compare(credentials.password, user.password)
        return match ? user : null
      },
    }),
  ],
}
