import CredentialsProvider from 'next-auth/providers/credentials'
import { getUserByEmail } from '@/app/lib/db'
import bcrypt from 'bcrypt'

export const authOptions = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    jwt({ token, user, trigger, session }) {
      console.log(`JWT callback triggered at ${new Date().toISOString()}`)
      console.log(`JWT callback - User: ${JSON.stringify(user)}`)
      console.log(`JWT callback - Trigger: ${trigger}`)
      console.log(
        `JWT callback - Session before update: ${JSON.stringify(session)}`,
      )

      if (user) {
        token.userId = user._id
        token.name = user.name
        token.avatar = user.avatar
        console.log(
          `JWT callback - Token updated with user info: ${JSON.stringify(
            token,
          )}`,
        )
      }
      if (trigger === 'update' && session.avatar) {
        token.avatar = session.avatar
        console.log(
          `JWT callback - Token avatar updated from session: ${token.avatar}`,
        )
      }
      if (trigger === 'update' && session.name) {
        token.name = session.name
        console.log(
          `JWT callback - Token name updated from session: ${token.name}`,
        )
      }
      console.log(
        `JWT callback - Token after all updates: ${JSON.stringify(token)}`,
      )
      return token
    },
    session({ session, token }) {
      console.log(`Session callback triggered at ${new Date().toISOString()}`)
      console.log(`Session callback - Token: ${JSON.stringify(token)}`)

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
        console.log(
          `Authorize function triggered at ${new Date().toISOString()}`,
        )
        console.log(
          `Authorize - Credentials received: ${JSON.stringify(credentials)}`,
        )
        if (!credentials.email || !credentials.password) return null

        const user = await getUserByEmail(credentials.email)
        console.log(
          `Authorize - User fetched by email: ${JSON.stringify(user)}`,
        )
        console.log(
          `Authorize - User fetched by email: ${new Date().toISOString()}`,
        )

        if (!user) return null

        const match = await bcrypt.compare(credentials.password, user.password)
        console.log(`Authorize - Password match result: ${match}`)

        return match ? user : null
      },
    }),
  ],
}
