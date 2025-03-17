import { deleteTestUser } from '@/app/lib/actions/user'

export async function DELETE(req) {
  const secret = process.env.TEST_USER_SECRET
  const { secret: reqSecret } = await req.json()
  console.log('reqSecret:', reqSecret)
  console.log('secret:', secret)
  if (secret !== reqSecret) {
    return new Response('Invalid data', { status: 401 })
  }
  try {
    const response = await deleteTestUser()
    if (response.state === 'success') {
      return new Response('User deleted', { status: 200 })
    } else {
      return new Response('Error deleting user', { status: 500 })
    }
  } catch (error) {
    console.error('Error deleting user:', error)
    return new Response('Error deleting user', { status: 500 })
  }
}
