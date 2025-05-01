// src/app/dashboard/page.tsx
'use client'

import { useEffect } from 'react'
import { useAuth } from '@presentation/contexts'
import { toast } from 'sonner'
// import { NavbarDemo } from '@/presentation/components/landing/NavBar'

export default function DashboardPage() {
  const { user, loading } = useAuth()

  // Apenas um toast condicional, sem redirecionamento (o middleware já faz isso)
  useEffect(() => {
    if (!loading && !user) {
      toast.error('Sessão expirada. Por favor, faça login novamente.')
    }
  }, [loading, user])

  if (loading) {
    return <div className="p-4">Carregando...</div>
  }

  return (
    <div className="relative w-full">
      {/* <NavbarDemo /> */}
      <div className="p-4">
        <h1 className="text-2xl font-semibold">Bem-vindo, {user?.email}!</h1>
      </div>
    </div>
  )
}