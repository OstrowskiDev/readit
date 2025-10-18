import { ActivationSuccessIco } from '@/ui/icons/ActivationSuccessIco'
import SimpleCardWrapper from '@/ui/layout/SimpleCardWrapper'
import SimpleCardButton from '@/ui/layout/SimpleCardButton'

export default function AccountActivated() {
  return (
    <SimpleCardWrapper
      name="account-activated"
      header="Success"
      message={`Congratulations, 
        your account has been 
        activated successfully!`}
      messageClasses="pb-0 text-center"
      ico={<ActivationSuccessIco />}
    >
      <SimpleCardButton text="Login" href="login" />
    </SimpleCardWrapper>
  )
}
