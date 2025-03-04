import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export async function sendActivationEmail(email, activationToken) {
  const activationLink = `http://localhost:3000/api/activate-account?activation_token=${activationToken}`

  const msg = {
    to: email,
    from: 'sekretariat@kancelaria-ciesielskamarkiewicz.com.pl', // !!!! use different email in production
    subject: 'Activate Your Account on ReadIt App',
    html: `<p>Click the link below to activate your account:</p>
           <a href="${activationLink}" target="_blank">Activate Account</a>
           <p>If you haven't created account on RedIt app ignore this email.</p>`,
  }
  try {
    await sgMail.send(msg)
  } catch (error) {
    console.error('Error sending email:', error)
  }
}
