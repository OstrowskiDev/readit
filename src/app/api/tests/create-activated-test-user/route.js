import { connectToDatabase } from '@/app/lib/db'
import { hashPassword } from '@/app/lib/security/hashPassword'
import { NextResponse } from 'next/server'
import User from '@/app/lib/models/User'

export async function POST(req) {
  try {
    const { secret: reqSecret } = await req.json()
    const secret = process.env.TEST_USER_SECRET

    if (secret !== reqSecret)
      return new NextResponse('Not Authorized', { status: 401 })

    const password = process.env.TEST_USER_PASSWORD
    const email = process.env.TEST_USER_EMAIL
    const hashedPassword = await hashPassword(password, 10)
    const testUserId = process.env.TEST_USER_ID
    const newActivatedUser = {
      _id: testUserId,
      name: 'TestUser',
      email: email,
      password: hashedPassword,
      is_active: true,
    }
    await connectToDatabase()
    await new User(newActivatedUser).save()
    return new NextResponse('TestUser created successfully!', { status: 201 })
  } catch (error) {
    console.error('Error creating testUser', error)
    return new NextResponse('Server error', { status: 500 })
  }
}
