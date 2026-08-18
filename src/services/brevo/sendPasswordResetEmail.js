import { generatePasswordResetBody } from './generatePasswordResetBody'

export async function sendPasswordResetEmail(email, recoveryToken, name) {
  const API_KEY = process.env.BREVO_NO_REPLY_OSTROWSKIDEV_KEY
  const emailFrom = process.env.BREVO_EMAIL_FROM

  try {
    const body = generatePasswordResetBody(name, recoveryToken)

    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'api-key': API_KEY,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: {
          email: emailFrom,
          name: 'Ostrowski Dev',
        },
        to: [{ email, name }],
        subject: 'ReadIt App - Password Recovery',
        htmlContent: body,
      }),
    })

    if (!res.ok) {
      throw new Error(`Brevo API error: ${res.status} ${res.statusText}`)
    }
  } catch (error) {
    console.error('Error sending password recovery email:', error)
    throw error
  }
}
