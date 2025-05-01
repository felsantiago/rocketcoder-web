// src/providers/Providers.tsx
'use client'

import { ReactNode } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '../lib/queryClient'
import { ThemeProvider } from 'next-themes'
import { Toaster } from '@/components/ui/toaster'
import { AxiosInterceptors } from '../components/axios/AxiosInterceptors'
import type { User } from '@supabase/supabase-js'
import { AuthProvider } from './auth/AuthContext'

export function Providers({
  children,
  authUser
}: {
  children: ReactNode
  authUser: User | null
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <AuthProvider authUser={authUser}>
          <AxiosInterceptors />
          {children}
          <Toaster />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}