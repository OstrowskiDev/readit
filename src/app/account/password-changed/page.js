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
      messageClasses="text-center"
      ico={<ActivationSuccessIco />}
    >
      <SimpleCardButton href="/login" text="Login" />
    </SimpleCardWrapper>
  )
}
