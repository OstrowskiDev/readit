'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { validateSignUp } from '../lib/security/validateSignUp'
import axios from 'axios'
import { checkEmailAvailability } from '../lib/actions/user'

// !!!! do poprawy: podczas rejestracji po naciśnięciu przycisku register pojawia się błąd pod jednym z pól

export default function RegisterForm() {
  const initialFormData = {
    name: '',
    email: '',
    password: '',
    fullName: '', // honeypot field
  }

  const validationObject = {
    name: { message: [] },
    email: { message: [] },
    password: { message: [] },
  }

  const [formData, setFormData] = useState(initialFormData)
  const [submitAttempted, setSubmitAttempted] = useState(false)
  const [fieldValidity, setFieldValidity] = useState({ ...validationObject })
  const [isEmailAvailable, setIsEmailAvailable] = useState(false)
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
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setSubmitAttempted(true)

    const hasValidationErrors = Object.values(fieldValidity).some(
      (field) => field.message.length > 0,
    )

    if (hasValidationErrors) {
      return
    }

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
    <div
      className="register-page w-full bg-white flex justify-center items-center"
      style={{ height: `calc(100vh - 72px)` }}
    >
      <div className="register-container w-[320px] p-8 rounded-lg bg-blue-500 shadow-lg">
        <h1 className="register-title text-2xl font-semibold text-white mb-4">
          Register
        </h1>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="register-name mt-4">
            <label
              className="register-name-label text-white block mb-1"
              htmlFor="name"
            >
              Username
            </label>
            <input
              className="register-name-input w-full px-4 py-2 rounded-lg bg-blue-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={onInputChange}
              placeholder="Enter your username"
              required
            />
            <label className="register-name-error text-xs text-red-200">
              {fieldValidity.name.message.length > 0 &&
                submitAttempted &&
                fieldValidity.name.message.join()}
            </label>
          </div>
          <div className="register-email mt-4">
            <label
              className="register-email-label text-white block mb-1"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="register-email-input w-full px-4 py-2 rounded-lg bg-blue-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={onInputChange}
              placeholder="Enter your email"
              required
            />
            <label className="register-email-error text-xs text-red-200">
              {fieldValidity.email.message.length > 0 &&
                submitAttempted &&
                fieldValidity.email.message.join()}
            </label>
            <label className="register-email-already-taken text-xs text-red-200">
              {!isEmailAvailable &&
                submitAttempted &&
                'An account with this email already exists. Please login or reset your password.'}
            </label>
          </div>
          <div className="register-password mt-4">
            <label
              className="register-password-label text-white block mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="register-password-input w-full px-4 py-2 rounded-lg bg-blue-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={onInputChange}
              placeholder="Enter your password"
              required
            />
            <label className="register-password-error text-xs text-red-200">
              {fieldValidity.password.message.length > 0 &&
                submitAttempted &&
                fieldValidity.password.message.join()}
            </label>
          </div>
          {/* Honeypot field */}
          <div className="register-fullName hidden">
            <label htmlFor="fullName">Full Name</label>
            <input type="text" name="fullName" id="fullName" />
          </div>
          <div className="register-submit mt-10">
            <button
              className="w-full h-12 bg-white text-blue-500 py-2 rounded-lg hover:bg-blue-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 font-bold active:bg-blue-200 hover:text-lg"
              type="submit"
            >
              Register!
            </button>
          </div>
        </form>
        <div className="login-container mt-6 text-center">
          <span className="text-white text-sm">Already have an account?</span>
          <Link href="/login">
            <span className="ml-1 text-white text-sm font-semibold cursor-pointer hover:underline">
              Login now
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}
