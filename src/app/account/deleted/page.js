import { ActivationSuccessIco } from '@/ui/icons/ActivationSuccessIco'
import SimpleCardWrapper from '@/ui/layout/SimpleCardWrapper'

export default function AccountDeletedPage() {
  return (
    <SimpleCardWrapper
      name="account-deleted"
      header="Account Deleted"
      message="All personal information has been permanently removed. Thank you for your interest in our application and for being with us."
      messageClasses="text-base !pb-2"
      ico={<ActivationSuccessIco />}
    />
  )
}
