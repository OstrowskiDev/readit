import { ActivationSuccessIco } from '@/ui/icons/ActivationSuccessIco'
import SimpleCardWrapper from '@/ui/layout/SimpleCardWrapper'

export default function ActivationEmailSend() {
  return (
    <SimpleCardWrapper
      name="activation-email"
      header="Email Sent"
      message="Please check your email and click the link to activate your account."
      ico={<ActivationSuccessIco />}
    />
  )
}
