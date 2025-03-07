import { validateSignUp } from '@/app/lib/security/validateSignUp'
import { hashPassword } from '@/app/lib/security/hashPassword'
import { createUser } from '@/app/lib/actions/user'
import { sendActivationEmail } from '@/app/lib/sendgrid/sendActivationEmail'

export async function POST(req) {
  try {
    const formData = await req.json()
    const { name, email, password, fullName } = formData

    const validationResults = validateSignUp(formData)
    const hasErrors = Object.values(validationResults).some(
      (field) => field.message.length > 0,
    )

    if (hasErrors) {
      return new Response(JSON.stringify({ error: 'Invalid input data' }), {
        status: 400,
      })
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
