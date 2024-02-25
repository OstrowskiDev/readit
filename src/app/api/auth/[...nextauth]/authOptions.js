import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getUserByEmail } from '@/app/lib/db'

export const authOptions = {
  // pages: {
  //   signIn: '/signin',
  //   signOut: '/signout',
  // },
  callbacks: {
    async session({ session }) {
      if (session?.user) {
        // this needs to be changed in the future
        // how can I pass user from authorize() func
        // so db will not be queried two times for same resource
        const user = await getUserByEmail(session?.user?.email)
        session.user.id = user['user-id']
      }
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

        if (credentials?.email === user.email && credentials?.password === user.password) {
          return user
        } else {
          return null
        }
      },
    }),
  ],
}
