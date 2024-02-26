import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getUserByEmail } from '@/app/lib/db'

export const authOptions = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) token.userId = user['user-id']
      return token
    },
    session({ session, token }) {
      session.user.id = token.userId
      return session
    },
    // jwt({ token, user }) {
    //   console.log(`token is:`)
    //   console.log(token)
    //   console.log(`user is:`)
    //   console.log(user)
    //   if (user) token.userId = user['user-id']
    //   console.log(`token.userId is: ${token.userId}`)
    //   return token
    // },
    // session({ session, token }) {
    //   console.log('session before token assigment:')
    //   console.log(session)
    //   session.user.id = token.userId
    //   console.log('session after assigment:')
    //   console.log(session)
    //   return session
    // },
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

        if (credentials?.email === user.email && credentials?.password === user.password) {
          return user
        } else {
          return null
        }
      },
    }),
  ],
}
