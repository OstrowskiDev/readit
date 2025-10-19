'use client'

import { validateSignUp } from '@/lib/security/validateSignUp'
import { checkEmailAvailability } from '@/lib/actions/user'
import { hasErrors } from '@/lib/security/hasErrors'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import SimpleCardWrapper from '@/ui/layout/SimpleCardWrapper'
import SimpleCardInput from '@/ui/layout/SimpleCardInput'
import SimpleCardSubmitBtn from '@/ui/layout/SimpleCardSubmitBtn'

// !!!! do poprawy: podczas rejestracji po naciśnięciu przycisku register pojawia się błąd pod jednym z pól
// !!!! add custom checkbox icon in free time

export default function RegisterForm() {
  const initialFormData = {
    name: '',
    email: '',
    password: '',
    privacyPolicy: false,
    fullName: '', // honeypot field
  }

  const validationObject = {
    name: { message: [] },
    email: { message: [] },
    password: { message: [] },
    privacyPolicy: { message: [] },
  }

  const [formData, setFormData] = useState(initialFormData)
  const [submitAttempted, setSubmitAttempted] = useState(false)
  const [fieldValidity, setFieldValidity] = useState({ ...validationObject })
  const [isEmailAvailable, setIsEmailAvailable] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const results = validateSignUp(formData)
    setFieldValidity(results)
  }, [formData])

  useEffect(() => {
    if (submitAttempted) {
      const debouncedEmailAvaCheck = setTimeout(async () => {
        const result = await checkEmailAvailability(formData.email)
        setIsEmailAvailable(result)
      }, 500)
      return () => clearTimeout(debouncedEmailAvaCheck)
    }
  }, [formData.email])

  function onInputChange(event) {
    if (event.target.name === 'privacyPolicy') {
      setFormData({ ...formData, [event.target.name]: event.target.checked })
    } else {
      setFormData({ ...formData, [event.target.name]: event.target.value })
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setSubmitAttempted(true)

    if (hasErrors(fieldValidity)) return

    setIsEmailAvailable(await checkEmailAvailability(formData.email))

    try {
      const response = await axios.post('/api/register', formData)
      if (response.status === 201) {
        router.push('/account/activation-email-send')
      }
    } catch (error) {
      console.error('Error during registration:', error)
    }
  }

  return (
    <SimpleCardWrapper name="register">
      <h1 className="register-title text-2xl font-semibold mb-4">Register</h1>

      <form className="register-form" onSubmit={handleSubmit} noValidate>
        <SimpleCardInput
          className="!mt-4"
          elementName="register-name"
          name="name"
          type="text"
          label="Username"
          placeholder="Enter your username"
          fieldValidity={fieldValidity}
          submitAttempted={submitAttempted}
          value={formData.name}
          onChange={onInputChange}
        />

        <SimpleCardInput
          className="!mt-4"
          elementName="register-email"
          name="email"
          type="email"
          label="Email"
          placeholder="Enter your email"
          fieldValidity={fieldValidity}
          submitAttempted={submitAttempted}
          value={formData.email}
          onChange={onInputChange}
        />

        <SimpleCardInput
          className="!mt-4"
          elementName="register-password"
          name="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
          fieldValidity={fieldValidity}
          submitAttempted={submitAttempted}
          value={formData.password}
          onChange={onInputChange}
        />

        <div className="register-policy flex flex-col mt-4">
          <div className="register-policy-wrapper flex">
            <label
              className="register-policy-label w-44 ml-4 text-sm block mb-1"
              htmlFor="privacyPolicy"
            >
              {'I have read and agree to the '}
              <a
                className="register-policy-anchor font-bold text-app-blue-text"
                href="/posts/post/privacy_policy"
                target="_blank"
              >
                Privacy Policy
              </a>
            </label>
            <input
              className={`register-policy-input w-6 ml-4 mr-6`}
              id="privacyPolicy"
              type="checkbox"
              name="privacyPolicy"
              checked={formData.privacyPolicy}
              onChange={onInputChange}
              required
            />
          </div>

          <label className="register-policy-error mt-1 ml-4 text-xs text-red-200">
            {fieldValidity.privacyPolicy.message.length > 0 &&
              submitAttempted &&
              fieldValidity.privacyPolicy.message.join(' ')}
          </label>
        </div>

        {/* Honeypot field */}
        <div className="register-fullName hidden">
          <label htmlFor="fullName">Full Name</label>
          <input type="text" name="fullName" id="fullName" />
        </div>

        <SimpleCardSubmitBtn text="Register!" className="!mt-10" />
      </form>

      <div className="login-container text-app-blue-text mt-6 text-center">
        <span className="text-sm">Already have an account?</span>
        <Link href="/login">
          <span className="ml-1 text-sm font-semibold cursor-pointer hover:underline text-app-blue-text">
            Login now
          </span>
        </Link>
      </div>
    </SimpleCardWrapper>
  )
}
