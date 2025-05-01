'use client'

import { UserMenu } from '@/components/layout/UserMenu'
import { useAuth } from '@/providers/auth/AuthContext'

export default function HomePage() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <div className="flex h-screen w-screen items-center justify-center bg-alternative">
      <div className="text-gray-400">Carregando...</div>
    </div>
  }

  return (
    <div className="flex flex-col h-screen w-screen bg-alternative text-foreground">
      {/* Header */}
      <header className="w-full px-8 py-4 border-b border-brand-divider bg-studio">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg width="22" height="22" viewBox="0 0 24 24" className="fill-brand" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0 1 20h11l-1 4 11-20H12Z" />
            </svg>
            <h1 className="text-lg font-semibold text-white">Ghost Coder</h1>
          </div>
          <UserMenu />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-studio">
        <div className="container max-w-7xl mx-auto px-8 py-8">
          {/* Welcome Card */}
          <div className="rounded-md border border-brand-divider bg-[#1A1A1A] p-6 shadow-lg mb-8">
            <h2 className="text-2xl font-semibold text-white mb-2">
              Bem-vindo, {user?.email}!
            </h2>
            <p className="text-[#E2E2E2] text-[13px] leading-relaxed">
              Aqui você pode gerenciar seus projetos e configurações.
            </p>
          </div>

          {/* Grid Cards */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-md border border-brand-divider bg-[#1A1A1A] p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-white mb-2">Seus Projetos</h3>
              <p className="text-[#E2E2E2] text-[13px] leading-relaxed">
                Acesse e gerencie seus projetos de desenvolvimento.
              </p>
            </div>
            <div className="rounded-md border border-brand-divider bg-[#1A1A1A] p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-white mb-2">Configurações</h3>
              <p className="text-[#E2E2E2] text-[13px] leading-relaxed">
                Personalize sua experiência e preferências.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}