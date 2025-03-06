import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export default function sendPasswordResetEmail(email, recoveryToken, userName) {
  try {
    const recoveryLink = `http://localhost:3000/api/reset_password?recovery_token=${recoveryToken}`

    const msg = {
      to: email,
      from: 'sekretariat@kancelaria-ciesielskamarkiewicz.com.pl', // !!!! use different email in production
      subject: 'ReadIt App - Password Recovery',
      html: ` 
      <div class="container">
        <h2>Password Reset Instructions</h2>
        <p>Hello <strong>${userName}</strong>,</p>
        <p>I've received a request to reset your password for your <strong>ReadIt</strong> account. If you made this request, please click the button below to reset your password:</p>
        <p style="text-align: center;">
            <a class="button" href="${recoveryLink}" target="_blank">Reset Password</a>
        </p>
        <p>This link is valid for the next <strong>60 minutes</strong>. If you did not request a password reset, please ignore this email.</p>
        <p class="footer">Best regards,<br><strong>OstrowskiDev</strong></p>
      </div>`,
    }
    sgMail.send(msg)
  } catch (error) {
    console.error('Error sending password recovery email:', error)
  }
}
