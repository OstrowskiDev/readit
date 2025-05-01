import { activateAccount } from '@/lib/actions/user'
import { connectToDatabase } from '@/lib/db'
import User from '@/lib/models/User'

export async function POST(req) {
  const secret = process.env.TEST_USER_SECRET
  const { secret: reqSecret } = await req.json()
  if (secret !== reqSecret) {
    return new Response('Invalid data', { status: 401 })
  }
  try {
    await connectToDatabase()
    const userEmail = process.env.TEST_USER_EMAIL
    const user = await User.findOne({ email: userEmail })
    const activation_token = user.activation_token
    const response = await activateAccount({ activation_token })
    if (response.state === 'success') {
      return new Response('Test user activated successfully', { status: 200 })
    } else {
      return new Response('Error activating test user', { status: 500 })
    }
  } catch (error) {
    console.error('Error activating test user:', error)
    return new Response('Error activating test user', { status: 500 })
  }
}
