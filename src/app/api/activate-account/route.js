import { activateAccount } from '@/app/lib/actions/user'
import { NextResponse } from 'next/server'

export async function GET(req) {
  console.log('activate-account route activated!')
  try {
    const url = new URL(req.url)
    const activation_token = url.searchParams.get('activation_token')
    if (!activation_token) {
      return NextResponse.redirect(
        new URL('/account/activation-failed', req.url),
      )
    }
    const response = await activateAccount({ activation_token })
    if (response.state === 'success') {
      return NextResponse.redirect(
        new URL('/account/account-activated', req.url),
      )
    } else {
      return NextResponse.redirect(
        new URL('/account/activation-failed', req.url),
      )
    }
  } catch (error) {
    console.error('Error in account activation:', error)
    return NextResponse.redirect(new URL('/account/activation-failed', req.url))
  }
}
