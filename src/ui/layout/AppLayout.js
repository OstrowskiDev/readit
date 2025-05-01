'use client'

import { ToastProvider } from '@/lib/toasts/ToastProvider'
import NavigationLayout from '@/ui/layout/NavigationLayout'

export default function AppLayout({ children }) {
  return (
    <div className="md:flex">
      <div className="w-full flex-none md:w-60">
        <NavigationLayout />
      </div>
      <ToastProvider>{children}</ToastProvider>
    </div>
  )
}
