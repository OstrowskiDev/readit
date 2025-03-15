import sgMail from '@sendgrid/mail'
import { generateEmailBody } from '../emails/converted-to-html/ResetPassword'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export default function sendPasswordResetEmail(email, recoveryToken, userName) {
  try {
    const body = generateEmailBody(userName, recoveryToken)
    const msg = {
      to: email,
      from: 'sekretariat@kancelaria-ciesielskamarkiewicz.com.pl', // !!!! use different email in production
      subject: 'ReadIt App - Password Recovery',
      html: body,
    }
    sgMail.send(msg)
  } catch (error) {
    console.error('Error sending password recovery email:', error)
  }
}
