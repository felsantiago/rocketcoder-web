'use client'

import {
  createContext, useContext, useEffect, useState, ReactNode,
} from 'react'
import type { User, AuthChangeEvent, Session } from '@supabase/supabase-js'
import { supabaseBrowser } from '@/lib/supabase/browser'
import { useRouter, usePathname } from 'next/navigation'
import { PROTECTED_ROUTES } from '@/lib/utils/config/routes'

interface Ctx {
  user: User | null
  loading: boolean
  login: (e: string, p: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthCtx = createContext<Ctx | null>(null)

export function AuthProvider ({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()
  const supabase = supabaseBrowser()

  /* 1 – initial, VALIDATED load ----------------------------------------- */
  useEffect(() => {
    ;(async () => {
      const { data, error } = await supabase.auth.getUser()
      if (error || !data.user) {
        setUser(null)
        if (PROTECTED_ROUTES.some(route => pathname?.startsWith(route))) {
          router.push('/signin')
        }
      } else {
        setUser(data.user)
      }
      setLoading(false)
    })()

    /* 2 – listen for future auth events ---------------------------------- */
    const { data: { subscription } } =
      supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {
        setUser(session?.user ?? null)
      })

    return () => subscription.unsubscribe()
  }, [router, supabase.auth, pathname])

  /* helpers -------------------------------------------------------------- */
  const login = async (email: string, password: string) => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    router.push('/home')
    setLoading(false)
  }

  const logout = async () => {
    await supabase.auth.signOut()
    router.push('/signin')
  }

  return (
    <AuthCtx.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthCtx.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthCtx)
  if (!ctx) throw new Error('useAuth must be inside <AuthProvider>')
  return ctx
}