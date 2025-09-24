import { addRecoveryToken } from '@/lib/actions/user'
import { validateEmail } from '@/lib/security/validateEmail'
import { sendPasswordResetEmail } from '@/services/brevo/sendPasswordResetEmail'

export async function POST(req) {
  try {
    const { email } = await req.json()

    const validationResults = validateEmail(email)
    if (validationResults.message.length > 0) {
      return new Response(JSON.stringify('Email validation failed'), {
        status: 400,
      })
    }

    const results = await addRecoveryToken(email)
    if (!results) {
      return new Response(JSON.stringify('Email not found'), {
        status: 404,
      })
    }
    const recoveryToken = results.recovery_token
    const userName = results.name
    await sendPasswordResetEmail(email, recoveryToken, userName)
    return new Response(JSON.stringify('Recovery email sent successfully'), {
      status: 200,
    })
  } catch (error) {
    console.error('Error during password recovery:', error)
    return new Response(JSON.stringify('Error during password recovery'), {
      status: 500,
    })
  }
}
