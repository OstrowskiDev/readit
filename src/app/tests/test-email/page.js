'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ResetPasswordEmail from '@/lib/emails/previews/ResetPassword'

export default function MailTemplateConfirmEmail() {
  const router = useRouter()

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      router.push('/404')
    }
  }, [])

  if (process.env.NODE_ENV === 'production') {
    return null
  }
  return <ResetPasswordEmail />
}
