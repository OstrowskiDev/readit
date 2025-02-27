import { validateSignUp } from '@/app/lib/security/validateSignUp'
import { hashPassword } from '@/app/lib/security/hashPassword'
import { createUser } from '@/app/lib/actions'

export async function POST(req) {
  try {
    const { name, email, password, fullName } = await req.json()

    const validationResults = validateSignUp({
      name,
      email,
      password,
      fullName,
    })

    if (validationResults.length > 0) {
      console.error(
        'Server validation failed for signup route, validation details:',
        validationResults,
      )
      return new Response(
        JSON.stringify({ message: 'Incorrect sign up data.' }),
        {
          status: 400,
        },
      )
    }

    const hashedPassword = await hashPassword(password, 10)
    createUser({ name, email, hashedPassword })

    return new Response(
      JSON.stringify({ message: 'User registered successfully' }),
      {
        status: 201,
      },
    )
  } catch (error) {
    console.error('Error in registration:', error)
    return new Response(JSON.stringify({ error: 'Something went wrong' }), {
      status: 500,
    })
  }
}
