import { validateSignUp } from '@/app/lib/security/validateSignUp'
import { hashPassword } from '@/app/lib/security/hashPassword'
import { createUser } from '@/app/lib/actions'
import { sendActivationEmail } from '@/app/lib/sendgrid/sendActivationEmail'

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
      throw new Error(
        'Server validation failed for signup route, validation details:',
        validationResults,
      )
    }

    const hashedPassword = await hashPassword(password, 10)
    const results = await createUser({ name, email, hashedPassword })
    if (results.state !== 'success') {
      throw new Error('Error occurred while executing createUser() function')
    }

    const activationToken = results.activation_token
    sendActivationEmail(email, activationToken)

    return new Response(
      JSON.stringify({ message: 'User registered successfully' }),
      {
        status: 201,
      },
    )
  } catch (error) {
    console.error('Error during registration:', error)
    return new Response(
      JSON.stringify({ error: 'Error during registration' }),
      {
        status: 500,
      },
    )
  }
}
