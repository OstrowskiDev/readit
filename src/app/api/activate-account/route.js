import { activateAccount } from '@/app/lib/actions'
import { NextResponse } from 'next/server'

export async function GET(req) {
  console.log('activate-account route activated!')
  try {
    const url = new URL(req.url)
    const activation_token = url.searchParams.get('activation_token')
    if (!activation_token) {
      return NextResponse.redirect(new URL('/activation-failed', req.url))
    }

    activateAccount({ activation_token })
    return NextResponse.redirect(new URL('/account-activated', req.url))
  } catch (error) {
    console.error('Error in account activation:', error)
    return NextResponse.redirect(new URL('/activation-failed', req.url))
  }
}
