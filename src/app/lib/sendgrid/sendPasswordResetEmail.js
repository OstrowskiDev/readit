import sgMail from '@sendgrid/mail'
import { generateEmailBody } from '../emails/converted-to-html/ResetPassword'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export default function sendPasswordResetEmail(email, recoveryToken, userName) {
  try {
    const emailFrom = process.env.SENDGRID_EMAIL_FROM
    const body = generateEmailBody(userName, recoveryToken)
    const msg = {
      to: email,
      from: emailFrom,
      subject: 'ReadIt App - Password Recovery',
      html: body,
    }
    sgMail.send(msg)
  } catch (error) {
    console.error('Error sending password recovery email:', error)
  }
}
