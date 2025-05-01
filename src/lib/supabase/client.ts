import { createBrowserClient } from '@supabase/ssr'

let supabaseInstance: ReturnType<typeof createBrowserClient> | null = null

export function getSupabaseClient() {
  if (typeof window === 'undefined') {
    // Se estiver no servidor, cria uma nova instância
    return createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  }

  if (!supabaseInstance) {
    // Se estiver no cliente e não houver instância, cria uma nova
    supabaseInstance = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  }

  return supabaseInstance
}

// Função para limpar a sessão
export const clearSession = () => {
  if (typeof window !== 'undefined') {
    // Remove todos os itens do localStorage que começam com 'supabase.auth'
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('supabase.auth')) {
        localStorage.removeItem(key)
      }
    })
    // Limpa o sessionStorage
    sessionStorage.clear()
  }
}

// Declaração global para o cliente Supabase
declare global {
  interface Window {
    supabase: ReturnType<typeof createBrowserClient>
  }
}