import sgMail from '@sendgrid/mail'
import { NextResponse } from 'next/server'
import { generateEmailBody } from '@/app/lib/emails/converted-to-html/ResetPassword'

// !!!! change email "from"
// !!!! delete this route so its not used in production

export async function POST() {
  console.log('POST /api/tests/email-template triggered')
  const username = 'John Doe'
  const activation_token = '1234567890'
  const emailBody = generateEmailBody(username, activation_token)
  console.log('emailBody created')

  const msg = {
    to: 'marcin.ostrowsky@gmail.com',
    from: 'sekretariat@kancelaria-ciesielskamarkiewicz.com.pl',
    subject: 'Activate Your Account on ReadIt App',
    html: emailBody,
  }

  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    await sgMail.send(msg)
    console.log('Email sent')
    return new NextResponse('Email sent', { status: 200 })
  } catch (error) {
    console.error('Error sending email:', error)
    return new NextResponse('Error sending email', { status: 500 })
  }
}
