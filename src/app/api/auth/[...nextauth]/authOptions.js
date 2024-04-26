import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getUserByEmail } from '@/app/lib/db'

export const authOptions = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.userId = user._id
        token.name = user.name
        token.avatar = user.avatar
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
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
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
        const user = await getUserByEmail(credentials?.email)

        if (
          credentials?.email === user.email &&
          credentials?.password === user.password
        ) {
          return user
        } else {
          return null
        }
      },
    }),
  ],
}
