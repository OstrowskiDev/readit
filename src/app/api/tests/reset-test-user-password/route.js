import { addRecoveryToken } from '@/app/lib/actions/user'

export async function POST(req) {
  try {
    const { secret: reqSecret } = await req.json()
    const secret = process.env.TEST_USER_SECRET

    if (secret !== reqSecret) {
      return new Response('Invalid data', { status: 401 })
    }
    const email = process.env.TEST_USER_EMAIL
    const results = await addRecoveryToken(email)
    if (!results) {
      return new Response(JSON.stringify('Email not found'), {
        status: 404,
      })
    }
    return new Response(JSON.stringify('Recovery token added to test user'), {
      status: 200,
    })
  } catch (error) {
    console.error('Error adding recovery token to test user:', error)
    return new Response(
      JSON.stringify('Error adding recovery token to test user'),
      {
        status: 500,
      },
    )
  }
}
