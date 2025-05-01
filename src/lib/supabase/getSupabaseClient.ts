// src/infrastructure/client/supabase/getSupabaseClient.ts
'use client'

import { createBrowserClient, createServerClient } from '@supabase/ssr'
import type { Database } from '@/types/supabase'

// Criar uma única instância do cliente
let supabaseClient: ReturnType<typeof createBrowserClient<Database>> | null = null

export const getSupabaseClient = (context: 'server' | 'client' = 'client') => {
  if (context === 'server') {
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error('Missing Supabase server credentials')
    }

    return createServerClient<Database>(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )
  }

  // Se já criamos um cliente, retorne-o
  if (supabaseClient) return supabaseClient

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error('Missing Supabase client credentials')
  }

  // Caso contrário, crie um novo
  supabaseClient = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    }
  )

  return supabaseClient
}