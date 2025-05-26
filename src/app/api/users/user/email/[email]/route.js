import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import User from '@/lib/models/User'
import validator from 'validator'

export async function GET(request, { params }) {
  // !!!! this route is used with next-auth
  // !!!! secure it with api-key in next-auth getUserByEmail(email, key)
  // !!!! check with RESTFull api where to put this endpoint
  const email = params.email
  if (!validator.isEmail(email))
    return new NextResponse('Invalid input: email must be a valid email', {
      status: 400,
    })

  try {
    await connectToDatabase()
    const user = await User.findOne({ email: email })
    if (user) {
      return new NextResponse(JSON.stringify(user), { status: 200 })
    } else {
      return new NextResponse(`User with that email doesn't exist`, {
        status: 404,
      })
    }
  } catch (error) {
    return new NextResponse('Error in fetching user' + error, { status: 500 })
  }
}
