import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/app/lib/db'
import Users from '@/app/lib/models/Users'

export async function GET(request, { params }) {
  const email = params.email
  try {
    await connectToDatabase()
    const user = await Users.findOne({ email: email })
    if (user) {
      return new NextResponse(JSON.stringify(user), { status: 200 })
    } else {
      return new NextResponse(`User with that email doesn't exist`, { status: 404 })
    }
  } catch (error) {
    return new NextResponse('Error in fetching user' + error, { status: 500 })
  }
}
