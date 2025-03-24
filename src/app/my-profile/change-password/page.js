'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { changePassword } from '@/app/lib/actions/user'
import { validatePasswords } from '@/app/lib/security/validatePasswords'

export default function ChangePassword() {
  const router = useRouter()
  const validationObject = {
    password: { message: [] },
    repeatPassword: { message: [] },
  }
  const [formData, setFormData] = useState({ password: '', repeatPassword: '' })
  const { password, repeatPassword } = formData
  const [submitAttempted, setSubmitAttempted] = useState(false)
  const [fieldValidity, setFieldValidity] = useState({ ...validationObject })
  const [recoveryToken, setRecoveryToken] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('recovery_token')
    setRecoveryToken(token)
  }, [])

  useEffect(() => {
    const results = validatePasswords(formData)
    setFieldValidity(results)
  }, [formData])

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
    try {
      const results = await changePassword({
        password: formData.password,
        repeatPassword: formData.repeatPassword,
      })
      if (results.state === 'success') {
        router.push('/account/password-changed')
      }
    } catch (error) {
      console.error('Error during password change:', error)
    }
  }

  return (
    <div
      className="password-change-page w-full bg-white flex justify-center items-center"
      style={{ height: `calc(100vh - 72px)` }}
    >
      <div className="password-change-container flex flex-col w-[320px] h-[484px] p-8 rounded-lg bg-blue-500 shadow-lg">
        <h1 className="password-change-title text-2xl font-semibold text-white">
          Change Password
        </h1>
        <form
          className="password-change-form flex flex-col flex-grow"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="password-change-new-password">
            <label
              className="password-change-new-password-label text-white block mt-8 mb-1"
              htmlFor="new-password"
            >
              New Password
            </label>
            <input
              className={`password-change-new-password-input w-full px-4 py-2 rounded-lg bg-blue-100 focus:bg-white focus:outline-none ring-2 ${
                fieldValidity.password.message.length > 0 && submitAttempted
                  ? 'ring-red-400 focus:ring-red-500'
                  : 'ring-blue-500 focus:ring-blue-400'
              }`}
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={onInputChange}
              placeholder="Enter new password"
              required
            />
            <label className="password-change-new-password-error text-xs text-red-200">
              {fieldValidity.password.message.length > 0 &&
                submitAttempted &&
                fieldValidity.password.message}
            </label>
          </div>

          <div className="password-change-repeat-password">
            <label
              className="password-change-repeat-password-label text-white block mt-8 mb-1"
              htmlFor="repeat-password"
            >
              Confirm Password
            </label>
            <input
              className={`password-change-repeat-password-input w-full px-4 py-2 rounded-lg bg-blue-100 focus:bg-white focus:outline-none ring-2 ${
                fieldValidity.repeatPassword.message.length > 0 &&
                submitAttempted
                  ? 'ring-red-400 focus:ring-red-500'
                  : 'ring-blue-500 focus:ring-blue-400'
              }`}
              type="password"
              name="repeatPassword"
              id="repeatPassword"
              value={repeatPassword}
              onChange={onInputChange}
              placeholder="Repeat new password"
              required
            />
            <label className="password-change-repeat-password-error text-xs text-red-200">
              {fieldValidity.repeatPassword.message.length > 0 &&
                submitAttempted &&
                fieldValidity.repeatPassword.message}
            </label>
          </div>
          <div className="password-change-separator flex-grow mt-4"></div>
          <div className="password-change-submit">
            <button
              className="password-change-submit-button w-full h-12 bg-white text-blue-500 py-2 rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 font-bold active:bg-blue-200 hover:text-lg"
              type="submit"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
