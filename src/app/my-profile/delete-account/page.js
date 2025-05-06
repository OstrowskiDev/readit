'use client'

import { useEffect, useState } from 'react'
import { hasErrors } from '@/lib/security/hasErrors'
import { signOut, useSession } from 'next-auth/react'
import { deleteAccount } from '@/lib/actions/user'
import { validateAccountDelOnClient } from '@/lib/security/validateAccountDelOnClient'
import { useToastContext } from '@/lib/toasts/ToastProvider'

export default function DeleteAccount() {
  const validationObject = {
    password: { message: [] },
    confirmation: { message: [] },
  }
  const { data: session } = useSession()
  const { toastFunctions: toast } = useToastContext()
  const [formData, setFormData] = useState({ password: '', confirmation: '' })
  const [submitAttempted, setSubmitAttempted] = useState(false)
  const [fieldValidity, setFieldValidity] = useState({ ...validationObject })

  const [response, setResponse] = useState({
    state: null,
    message: null,
  })

  useEffect(() => {
    if (!session) {
      //below code fixes firefox issues with calling signIn() in useEffect
      //https://github.com/nextauthjs/next-auth/issues/9177
      if (signingIn.current) return
      signingIn.current = true
      signIn()
      return
    }
  }, [session])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (response?.state === 'success') {
      toast.success(response.message)
    }
    if (response?.state === 'error') {
      toast.error(response.message)
    }
  }, [response])

  useEffect(() => {
    const results = validateAccountDelOnClient(formData)
    setFieldValidity(results)
  }, [formData])

  function onInputChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setSubmitAttempted(true)
    if (hasErrors(fieldValidity)) return

    try {
      const results = await deleteAccount({
        password: formData.password,
        confirmation: formData.confirmation,
      })
      if (results.state === 'success') {
        signOut({ callbackUrl: '/account/deleted' })
      } else {
        setResponse(results)
      }
    } catch (error) {
      console.error('Error during password change:', error)
    }
  }

  return (
    <div
      className="delete-account-page w-full bg-white flex justify-center items-center"
      style={{ height: `calc(100vh - 72px)` }}
    >
      <div className="delete-account-container flex flex-col w-[320px] h-[484px] p-8 rounded-lg bg-blue-500 shadow-lg">
        <h1 className="delete-account-title text-2xl font-semibold text-white">
          Delete Account
        </h1>
        <p className="delete-account-info mt-4 text-white text-sm font-bold">
          Important! This action is irreversible!
        </p>
        <p className="delete-account-info mt-1 text-white text-sm">
          Once deleted, your account and all personal data will be permanently
          removed. You will no longer be able to access your profile or log in.
        </p>
        <form
          className="delete-account-form flex flex-col flex-grow"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="delete-account-password">
            <label
              className="delete-account-password-label text-white block mt-4 mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className={`delete-account-password-input w-full px-4 py-2 rounded-lg bg-blue-100 focus:bg-white focus:outline-none ring-2 ${
                fieldValidity.password?.message?.length > 0 && submitAttempted
                  ? 'ring-red-400 focus:ring-red-500'
                  : 'ring-blue-500 focus:ring-blue-400'
              }`}
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={onInputChange}
              placeholder="Enter your password"
              required
            />
            <label className="delete-account-password-error text-xs text-red-200">
              {fieldValidity.password?.message?.length > 0 &&
                submitAttempted &&
                fieldValidity.password?.message?.join(' ')}
            </label>
          </div>

          <div className="delete-account-confirm">
            <label
              className="delete-account-confirm-label text-white block mt-4 mb-1"
              htmlFor="confirmation"
            >
              Confirm Deletion
            </label>
            <input
              className={`delete-account-confirm-input w-full px-4 py-2 rounded-lg bg-blue-100 focus:bg-white focus:outline-none ring-2 ${
                fieldValidity.confirmation?.message?.length > 0 &&
                submitAttempted
                  ? 'ring-red-400 focus:ring-red-500'
                  : 'ring-blue-500 focus:ring-blue-400'
              }`}
              type="text"
              name="confirmation"
              id="confirmation"
              value={formData.confirmation}
              onChange={onInputChange}
              placeholder="type DELETE to confirm"
              required
            />
            <label className="delete-account-confirmation-error text-xs text-red-200">
              {fieldValidity.confirmation?.message?.length > 0 &&
                submitAttempted &&
                fieldValidity.confirmation?.message?.join(' ')}
            </label>
          </div>
          <div className="delete-account-separator flex-grow mt-4"></div>
          <div className="delete-account-submit">
            <button
              className="delete-account-submit-button w-full h-12 bg-white text-blue-500 py-2 rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 font-bold active:bg-blue-200 hover:text-lg"
              type="submit"
            >
              Delete Account
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
