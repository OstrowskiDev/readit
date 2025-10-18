import { ActivationSuccessIco } from '@/ui/icons/ActivationSuccessIco'
import SimpleCardWrapper from '@/ui/layout/SimpleCardWrapper'

export default function RecoveryEmailSend() {
  return (
    <SimpleCardWrapper
      name="activation-email"
      header="Email Sent"
      message={`Please check your  
      inbox and click the link to 
      change your password.`}
      messageClasses="text-center"
      ico={<ActivationSuccessIco />}
    />
  )
}
