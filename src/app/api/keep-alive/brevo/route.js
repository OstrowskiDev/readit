export async function POST(req) {
  const secret = process.env.KEEP_ALIVE_SECRET
  const { secret: reqSecret, target } = await req.json()

  const emails = [
    {
      from: 'no-reply@ostrowskidev.com',
      apiKey: process.env.BREVO_NO_REPLY_OSTROWSKIDEV_KEY,
      to: 'marcin.ostrowski.coding@gmail.com',
    },
    {
      from: 'contact@ostrowskidev.com',
      apiKey: process.env.BREVO_CONTACT_OSTROWSKIDEV_KEY,
      to: 'marcin.ostrowski.coding@gmail.com',
    },
  ]

  const email = emails.find((email) => email.from === target)

  if (secret !== reqSecret || !email) {
    return new Response('Invalid data', { status: 401 })
  }

  try {
    const response = sendKeepAlive({
      emailTo: email.to,
      emailFrom: email.from,
      apiKey: email.apiKey,
    })
    if (response.state === 'success') {
      return new Response(`Keep-alive ${target} email sent`, { status: 200 })
    }
  } catch (error) {
    console.error(`Error sending keep-alive ${target} email`, error)
    return new Response('Error sending email', { status: 500 })
  }
}
