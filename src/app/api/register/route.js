import bcrypt from 'bcrypt'

export async function POST(req) {
  try {
    const { username, email, password, fullName } = await req.json()

    // honeypot bot check
    if (fullName) {
      return new Response(JSON.stringify({ error: 'Invalid request' }), {
        status: 400,
      })
    }

    // const hashedPassword = await hash(password, 10)
    async function hashPassword(password, saltNo) {
      const salt = await bcrypt.genSalt(saltNo)
      const hashedPassword = await bcrypt.hash(password, salt)
      console.log(`Plaintext: ${password}, Hashed: ${hashedPassword}`)
    }

    const hashedPassword = hashPassword(password, 10)

    console.log('New user:', { username, email, hashedPassword })

    return new Response(
      JSON.stringify({ message: 'User registered successfully' }),
      {
        status: 201,
      },
    )
  } catch (error) {
    console.error('Error in registration:', error)
    return new Response(JSON.stringify({ error: 'Something went wrong' }), {
      status: 500,
    })
  }
}
