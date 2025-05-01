'use client'

import { Providers } from '@/providers/Providers'

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers authUser={null}>
      {children}
    </Providers>
  )
}