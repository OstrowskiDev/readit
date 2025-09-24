import { validateSignUp } from '@/lib/security/validateSignUp'
import { hashPassword } from '@/lib/security/hashPassword'
import { createUser } from '@/lib/actions/user'
import { hasErrors } from '@/lib/security/hasErrors'
import { sendActivationEmail } from '@/services/brevo/sendActivationEmail'

export async function POST(req) {
  try {
    const formData = await req.json()
    const { name, email, password, fullName } = formData

    const validationResults = validateSignUp(formData)
    if (hasErrors(validationResults)) {
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
    await sendActivationEmail(name, email, activationToken)

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
