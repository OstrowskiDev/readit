import sgMail from '@sendgrid/mail'
import { generateEmailBody } from '@/app/lib/emails/converted-to-html/ConfirmEmail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export async function sendActivationEmail(name, email, activationToken) {
  const body = generateEmailBody(name, activationToken)
  const msg = {
    to: email,
    from: 'sekretariat@kancelaria-ciesielskamarkiewicz.com.pl', // !!!! use different email in production
    subject: 'Activate Your Account on ReadIt App',
    html: body,
  }
  try {
    await sgMail.send(msg)
  } catch (error) {
    console.error('Error sending email:', error)
  }
}
