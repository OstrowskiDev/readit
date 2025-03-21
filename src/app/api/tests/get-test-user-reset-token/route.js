import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/app/lib/db'
import User from '@/app/lib/models/User'

export async function POST(req) {
  const secret = process.env.TEST_USER_SECRET
  const { secret: reqSecret } = await req.json()

  if (secret !== reqSecret) {
    return new NextResponse('Invalid data', { status: 401 })
  }
  try {
    await connectToDatabase()
    const userEmail = process.env.TEST_USER_EMAIL
    const user = await User.findOne({
      email: userEmail,
    })
    const recovery_token = user.recovery_token
    console.log('recovery_token:', recovery_token)
    return NextResponse.json({ recovery_token }, { status: 200 })
  } catch (error) {
    console.error('Error getting reset token:', error)
    return new NextResponse('Error getting reset token', { status: 500 })
  }
}
