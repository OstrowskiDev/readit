import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getUserByEmail } from '@/app/lib/db'

export const authOptions = {
  // pages: {
  //   signIn: '/signin',
  //   signOut: '/signout',
  // },
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
