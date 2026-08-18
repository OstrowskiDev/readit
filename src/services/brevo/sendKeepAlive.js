export async function sendKeepAlive(data) {
  const { emailTo, emailFrom, apiKey } = data

  try {
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: {
          email: emailFrom,
          name: 'Ostrowski Dev',
        },
        to: [{ email: emailTo }],
        subject: `Keep Alive - Brevo ${emailFrom}`,
        htmlContent: `<p>Keep-alive from ${emailFrom}</p>`,
      }),
    })

    if (!res.ok) {
      throw new Error(`Brevo API error: ${res.status} ${res.statusText}`)
    }

    return { state: 'success' }
  } catch (error) {
    console.error('Error sending keep alive email:', error)
    throw error
  }
}
