'use client'

import { validateEmail } from '@/lib/security/validateEmail'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import axios from 'axios'
import SimpleCardWrapper from '@/ui/layout/SimpleCardWrapper'
import SimpleCardInput from '@/ui/layout/SimpleCardInput'
import SimpleCardSubmitBtn from '@/ui/layout/SimpleCardSubmitBtn'

export default function ForgotPassword() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [submitAttempted, setSubmitAttempted] = useState(false)
  const [validationMessage, setValidationMessage] = useState({ message: '' })

  useEffect(() => {
    const validationResults = validateEmail(email)
    setValidationMessage(validationResults)
  }, [email])

  function onInputChange(event) {
    setEmail(event.target.value)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setSubmitAttempted(true)
    if (validationMessage.message.length > 0) {
      setValidationMessage(validateEmail(email))
      return
    }
    try {
      const results = await axios.post('/api/recovery-email', { email })
      if (results.status === 200) {
        router.push('/account/recovery-email-send')
      }
    } catch (error) {
      console.error('Error during password recovery:', error)
    }
  }

  return (
    <SimpleCardWrapper
      name="password-recovery"
      containerClasses="min-h-[420px]"
      header={`Reset password`}
      headerClasses="capitalize"
    >
      <form
        className="password-recovery-form flex flex-col flex-grow mt-4"
        onSubmit={handleSubmit}
        noValidate
      >
        <SimpleCardInput
          elementName="password-recovery-email"
          name="email"
          type="email"
          label="Email"
          placeholder="Enter your email"
          fieldValidity={{ email: { ...validationMessage } }}
          submitAttempted={submitAttempted}
          value={email}
          onChange={onInputChange}
        />

        <p className="password-recovery-text text-sm mt-4">{`Enter the email associated with your account and we'll send you an email with instructions to reset your password.`}</p>

        <div className="password-recovery-separator flex-grow mt-4"></div>
        <SimpleCardSubmitBtn text="Send" />
      </form>
    </SimpleCardWrapper>
  )
}
