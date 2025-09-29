'use client'

import { validateEmail } from '@/lib/security/validateEmail'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import axios from 'axios'

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
    <div
      className="password-recovery-page w-full flex justify-center items-center"
      style={{ height: `calc(100vh - 72px)` }}
    >
      <div className="password-recovery-container flex flex-col w-[320px] h-[484px] p-8 rounded-lg bg-blue-500 shadow-lg">
        <h1 className="password-recovery-title text-2xl font-semibold text-white">
          Send recovery email
        </h1>
        <form
          className="password-recovery-form flex flex-col flex-grow"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="password-recovery-email">
            <p className="password-recovery-description mt-4 text-white text-sm mb-4">
              Enter the email associated with your account and we&apos;ll send
              you an email with instructions to reset your password.
            </p>
            <label
              className="password-recovery-email-label text-white block mt-8 mb-1"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="password-recovery-email-input w-full px-4 py-2 rounded-lg bg-blue-100 focus:bg-white focus:outline-none ring-2 focus:ring-blue-400"
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={onInputChange}
              placeholder="Enter your email"
              required
            />
            <label className="password-recovery-email-error text-xs text-red-200">
              {validationMessage.message.length > 0 &&
                submitAttempted &&
                validationMessage.message}
            </label>
          </div>
          <div className="password-recovery-separator flex-grow mt-4"></div>
          <div className="password-recovery-submit">
            <button
              className="password-recovery-submit-button w-full h-12 bg-white text-blue-500 py-2 rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 font-bold active:bg-blue-200 hover:text-lg"
              type="submit"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
