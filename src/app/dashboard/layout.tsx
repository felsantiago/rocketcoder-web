// src/app/dashboard/layout.tsx
'use client'

import { Providers } from '@/providers/Providers'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers authUser={null}>
      {children}
    </Providers>
  )
}