import { handleFailedLogin } from '@/lib/actions/user'
import { validateSignIn } from '@/lib/security/validateSignIn'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import { getUserForCredentialsAuth } from '@/lib/actions/auth'

export const authOptions = {
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    jwt({ token, user, trigger, session }) {
      if (user) {
        token.userId = user.id
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
        const { email, password } = credentials

        const isInputValid = validateSignIn({ email, password })
        if (!isInputValid) return null

        const user = await getUserForCredentialsAuth(credentials.email)
        if (!user) return null

        if (user.is_active === false) {
          throw new Error('AccountInactive')
        }

        if (user.status === 'locked') {
          throw new Error('AccountBlocked')
        }

        const match = await bcrypt.compare(credentials.password, user.password)
        if (!match) {
          handleFailedLogin(email)
        }

        return match ? user : null
      },
    }),
  ],
}
