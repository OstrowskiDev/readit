import sgMail from '@sendgrid/mail'
import { generateEmailBody } from '@/lib/emails/converted-to-html/ConfirmEmail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export async function sendActivationEmail(name, email, activationToken) {
  const emailFrom = process.env.SENDGRID_EMAIL_FROM
  const body = generateEmailBody(name, activationToken)
  const msg = {
    to: email,
    from: emailFrom,
    subject: 'Activate Your Account on ReadIt App',
    html: body,
  }
  try {
    await sgMail.send(msg)
  } catch (error) {
    console.error('Error sending email:', error)
  }
}
