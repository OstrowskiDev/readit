import { addRecoveryToken } from '@/app/lib/actions/user'

export async function POST(req) {
  try {
    const { email } = await req.json()

    // const validationResults = validateEmail(email)
    // if (validationResults.message.length > 0) {
    //   return new Response(JSON.stringify('Email validation failed'), {
    //     status: 400,
    //   })
    // }

    const results = await addRecoveryToken(email)
    if (!results) {
      return new Response(JSON.stringify('Email not found'), {
        status: 404,
      })
    }
    const recoveryToken = results.recovery_token
    const userName = results.name
    sendPasswordResetEmail(email, recoveryToken, userName)
  } catch (error) {}
}
