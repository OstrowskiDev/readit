'use client'

import { useEffect, useState } from 'react'
import { hasErrors } from '@/lib/security/hasErrors'
import { signOut, useSession } from 'next-auth/react'
import { deleteAccount } from '@/lib/actions/user'
import { validateAccountDelOnClient } from '@/lib/security/validateAccountDelOnClient'
import { useToastContext } from '@/lib/toasts/ToastProvider'
import SimpleCardWrapper from '@/ui/layout/SimpleCardWrapper'
import SimpleCardInput from '@/ui/layout/SimpleCardInput'
import SimpleCardSubmitBtn from '@/ui/layout/SimpleCardSubmitBtn'

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
    <SimpleCardWrapper name="delete-account">
      <h1 className="delete-account-title text-2xl font-semibold">
        Delete Account
      </h1>
      <p className="delete-account-info mt-4  text-sm font-bold">
        Important! This action is irreversible!
      </p>
      <p className="delete-account-info mt-1  text-sm">
        Once deleted, your account and all personal data will be permanently
        removed. You will no longer be able to access your profile or log in.
      </p>
      <form
        className="delete-account-form flex flex-col flex-grow"
        onSubmit={handleSubmit}
        noValidate
      >
        <SimpleCardInput
          className="!mt-4"
          elementName="delete-account-password"
          name="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
          fieldValidity={fieldValidity}
          submitAttempted={submitAttempted}
          value={formData.password}
          onChange={onInputChange}
        />

        <SimpleCardInput
          className="!mt-4"
          elementName="delete-account-confirm"
          name="confirmation"
          type="text"
          label="Confirm Deletion"
          placeholder="type DELETE to confirm"
          fieldValidity={fieldValidity}
          submitAttempted={submitAttempted}
          value={formData.confirmation}
          onChange={onInputChange}
        />

        <SimpleCardSubmitBtn text="Delete Account" />
      </form>
    </SimpleCardWrapper>
  )
}
