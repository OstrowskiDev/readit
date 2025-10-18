import { ActivationSuccessIco } from '@/ui/icons/ActivationSuccessIco'
import SimpleCardWrapper from '@/ui/layout/SimpleCardWrapper'
import SimpleCardButton from '@/ui/layout/SimpleCardButton'

export default function PasswordChanged() {
  return (
    <SimpleCardWrapper
      name="password-changed"
      header="Success"
      message={`Congratulations, 
        your password has been
        changed successfully!`}
      messageClasses="pb-0 text-center text-lg"
      ico={<ActivationSuccessIco />}
    >
      <SimpleCardButton href="/my-profile" text="Back to my profile" />
    </SimpleCardWrapper>
  )
}
