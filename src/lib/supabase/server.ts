/* server-only */
import { cookies, headers } from 'next/headers'
import { createServerClient, type CookieOptions } from '@supabase/ssr'

export function supabaseServer() {
  const cookieStore = cookies()
  const headerStore = headers()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (items) => {
          items.forEach(({ name, value, options }) => {
            cookieStore.set({ name, value, ...options } as CookieOptions)
          })
        }
      },
      headers: { get: (k) => headerStore.get(k) ?? undefined }
    }
  )
}