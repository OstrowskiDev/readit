'use client'

import { ToastProvider } from '@/lib/toasts/ToastProvider'
import NavigationLayout from '@/ui/layout/NavigationLayout'

export default function AppLayout({ children }) {
  return (
    <div className="lg:flex">
      <div className="w-full flex-none lg:w-60">
        <NavigationLayout />
      </div>
      <ToastProvider>{children}</ToastProvider>
    </div>
  )
}
