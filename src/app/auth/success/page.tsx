'use client'

import { useEffect, useState } from 'react'
import LogoNavbar from '@/components/auth/LogoNavbar'
import { Button } from '@/components/ui/button'
import { supabaseBrowser } from '@/lib/supabase/browser'

export default function AuthSuccessPage() {
  const [session, setSession] = useState<any>(null)

  useEffect(() => {
    const redirectToApp = async () => {
      const supabase = supabaseBrowser()
      const { data: { session }, error } = await supabase.auth.getSession()

      if (session) {
        setSession(session)
        // Redireciona automaticamente após 3 segundos
        setTimeout(() => {
          window.location.href = `codewingman://auth/callback?access_token=${session.access_token}&refresh_token=${session.refresh_token}`
        }, 3000)
      }
    }

    redirectToApp()
  }, [])

  const handleManualRedirect = () => {
    if (session) {
      window.location.href = `codewingman://auth/callback?access_token=${session.access_token}&refresh_token=${session.refresh_token}`
    }
  }

  return (
    <div className="flex flex-col h-screen w-screen bg-alternative text-foreground">
      <LogoNavbar />
      <div className="flex flex-1 overflow-y-hidden">
        <main className="flex flex-col flex-shrink-0 flex-1 items-center px-5 pb-8 border-r border-brand-divider shadow-lg bg-studio pt-16 overflow-y-auto">
          <div className="flex flex-col justify-center w-[330px] sm:w-[384px] flex-1">
            <div className="flex flex-col items-center text-center">
              <div className="mb-6">
                <svg className="w-12 h-12 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h1 className="text-2xl lg:text-3xl text-white mb-2">Sucesso!</h1>
              <p className="text-sm text-gray-400 mb-8">
                A autenticação foi realizada com sucesso. Você será redirecionado automaticamente para o Rocket Coder em alguns segundos.
                <br /><br />
                Você pode fechar esta janela ou usar o botão abaixo para voltar ao aplicativo.
              </p>
              <Button
                onClick={handleManualRedirect}
                className="h-[42px] w-full bg-brand hover:bg-brand/80 text-background"
              >
                Voltar para o aplicativo
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}