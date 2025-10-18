import { ActivationFailedIco } from '@/ui/icons/ActivationFailedIco'
import SimpleCardWrapper from '@/ui/layout/SimpleCardWrapper'

export default function ActivationFailed() {
  return (
    <SimpleCardWrapper
      name="activation-failed"
      header="Failed"
      message={`Activation failed, try again later or contact site administrator.`}
      messageClasses="text-center"
      ico={<ActivationFailedIco />}
    />
  )
}
