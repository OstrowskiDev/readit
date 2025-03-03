import { activateAccount } from '@/app/lib/actions'

export async function GET(req) {
  console.log('activate-account route activated!')
  try {
    const url = new URL(req.url)
    const activation_token = url.searchParams.get('activation_token')
    if (!activation_token) {
      return new Response(
        JSON.stringify({ error: 'Activation token is missing' }),
        {
          status: 400,
        },
      )
    }

    activateAccount({ activation_token })
    return new Response(
      JSON.stringify({ message: 'Account activated successfully' }),
      {
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error in account activation:', error)
    return new Response(JSON.stringify({ error: 'Something went wrong' }), {
      status: 500,
    })
  }
}
