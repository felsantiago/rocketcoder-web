'use client'

import { useAuth } from '@/providers/auth/AuthContext'
import { useRouter } from 'next/navigation'
import { useLayoutEffect } from 'react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { user, isLoading } = useAuth()

  // Redireciona para página de não autorizado se não estiver autenticado
  useLayoutEffect(() => {
    if (!isLoading && !user) {
      router.replace('/unauthorized', { scroll: false })
    }
  }, [user, isLoading, router])

  // Não mostra nada até ter certeza do estado de autenticação
  if (isLoading || !user) {
    return null
  }

  return children
}