'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ResetPasswordForm } from '@/components/auth/ResetPasswordForm'
import LogoNavbar from '@/components/auth/LogoNavbar'
import { Button } from '@/components/ui/button'
import { supabaseBrowser } from '@/lib/supabase/browser'

export default function ResetPasswordPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const checkSession = async () => {
      try {
        const supabase = supabaseBrowser()
        const { data: { session }, error } = await supabase.auth.getSession()

        if (error) throw error
        if (!session) {
          setError('expired')
        }
      } catch (error) {
        console.error('Erro ao verificar sessão:', error)
        setError('expired')
      } finally {
        setIsLoading(false)
      }
    }

    checkSession()
  }, [])

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-alternative">
        <div className="text-gray-400">Carregando...</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen w-screen bg-alternative text-foreground">
      <LogoNavbar />
      <div className="flex flex-1 overflow-y-hidden">
        <main className="flex flex-col flex-shrink-0 flex-1 items-center px-5 pb-8 border-r border-brand-divider shadow-lg bg-studio pt-16 overflow-y-auto">
          <div className="flex flex-col justify-center w-[330px] sm:w-[384px] flex-1">
            {error === 'expired' ? (
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
                <h1 className="text-2xl lg:text-3xl text-white mb-2">Link expirado</h1>
                <p className="text-sm text-gray-400 mb-8">
                  O link para redefinir sua senha expirou ou é inválido.
                  Por favor, solicite um novo link de redefinição de senha.
                </p>
                <Button
                  onClick={() => router.push('/forgot-password')}
                  className="h-[42px] w-full bg-brand hover:bg-brand-dark text-gray-900"
                >
                  Solicitar novo link
                </Button>
              </div>
            ) : (
              <>
                <div className="mb-10">
                  <h1 className="mt-8 mb-2 text-2xl lg:text-3xl text-white">Redefinir senha</h1>
                  <h2 className="text-sm text-gray-400">Digite sua nova senha</h2>
                </div>

                <ResetPasswordForm />
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}