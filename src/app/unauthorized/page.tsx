'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/providers/auth/AuthContext'
import LogoNavbar from '@/components/auth/LogoNavbar'
import { Button } from '@/components/ui/button'

export default function UnauthorizedPage() {
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    const timer = setTimeout(() => {
      // Se estiver autenticado, volta para home, senão vai para signin
      router.replace(user ? '/home' : '/signin', { scroll: false })
    }, 3000) // 3 segundos de delay

    return () => clearTimeout(timer)
  }, [router, user])

  return (
    <div className="flex flex-col h-screen w-screen bg-alternative text-foreground">
      <LogoNavbar />
      <div className="flex flex-1 overflow-y-hidden">
        <main className="flex flex-col flex-shrink-0 flex-1 items-center px-5 pb-8 border-r border-brand-divider shadow-lg bg-studio pt-16 overflow-y-auto">
          <div className="flex flex-col justify-center w-[330px] sm:w-[384px] flex-1">
            <div className="flex flex-col items-center text-center">
              <div className="mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h1 className="text-2xl lg:text-3xl text-white mb-2">Acesso Não Autorizado</h1>
              <p className="text-sm text-gray-400 mb-8">
                Você não tem permissão para acessar esta página.
                Por favor, faça login com uma conta que tenha as permissões necessárias.
              </p>
              <Button
                onClick={() => router.push('/signin')}
                className="h-[42px] w-full bg-brand hover:bg-brand-dark text-gray-900"
              >
                Ir para login
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}