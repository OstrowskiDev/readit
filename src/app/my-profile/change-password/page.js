'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { changePassword } from '@/lib/actions/user'
import { validatePasswords } from '@/lib/security/validatePasswords'
import { hasErrors } from '@/lib/security/hasErrors'
import SimpleCardWrapper from '@/ui/layout/SimpleCardWrapper'
import SimpleCardInput from '@/ui/layout/SimpleCardInput'
import SimpleCardSubmitBtn from '@/ui/layout/SimpleCardSubmitBtn'

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
    if (hasErrors(fieldValidity)) return

    try {
      const results = await changePassword({
        password: formData.password,
        repeatPassword: formData.repeatPassword,
      })
      if (results.state === 'success') {
        router.push('/my-profile/password-changed')
      }
    } catch (error) {
      console.error('Error during password change:', error)
    }
  }

  return (
    <SimpleCardWrapper
      name="password-change"
      header="Change Password"
      headerClasses="capitalize !whitespace-nowrap"
    >
      <form
        className="password-change-form flex flex-col flex-grow"
        onSubmit={handleSubmit}
        noValidate
      >
        <SimpleCardInput
          elementName="password-change-new-password"
          name="password"
          type="password"
          label="New Password"
          placeholder="Enter new password"
          fieldValidity={fieldValidity}
          submitAttempted={submitAttempted}
          value={password}
          onChange={onInputChange}
        />

        <SimpleCardInput
          elementName="password-change-repeat-password"
          name="repeatPassword"
          type="password"
          label="Repeat Password"
          placeholder="Repeat new password"
          fieldValidity={fieldValidity}
          submitAttempted={submitAttempted}
          value={repeatPassword}
          onChange={onInputChange}
        />

        <div className="password-change-separator flex-grow mt-4"></div>
        <SimpleCardSubmitBtn text="Save Changes" />
      </form>
    </SimpleCardWrapper>
  )
}
