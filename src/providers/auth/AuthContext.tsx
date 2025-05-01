'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import type { User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { createBrowserClient } from '@supabase/ssr'
import { SecurityLogger, SecurityEventType } from '@/infrastructure/services/security-logger'

interface AuthUser extends User {
  access_token?: string
}

interface AuthContextType {
  user: AuthUser | null
  isLoading: boolean
  signOut: () => Promise<void>
  login: (email: string, password: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({
  children,
  authUser
}: {
  children: React.ReactNode
  authUser: User | null
}) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const securityLogger = SecurityLogger.getInstance()

  // Cria o cliente Supabase do lado do cliente
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    const initializeUser = async () => {
      try {
        console.log('Initializing user...')

        // Tenta obter a sessão atual
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()

        if (sessionError) {
          console.error('Error getting session:', sessionError)
          setUser(null)
          router.push('/signin')
          return
        }

        if (session?.user) {
          console.log('Setting user from session:', session.user)
          setUser({
            ...session.user,
            access_token: session.access_token
          } as AuthUser)
        } else {
          console.log('No session found, redirecting to signin')
          setUser(null)
          router.push('/signin')
        }
      } catch (error) {
        console.error('Error in initializeUser:', error)
        setUser(null)
        router.push('/signin')
      } finally {
        setIsLoading(false)
      }
    }

    // Inicializa imediatamente
    initializeUser()

    // Configura listener para mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session?.user)

      if (event === 'SIGNED_IN' && session?.user) {
        setUser({
          ...session.user,
          access_token: session.access_token
        } as AuthUser)
      } else if (event === 'SIGNED_OUT') {
        // Não fazemos nada aqui, deixamos o método signOut lidar com o logout
        console.log('Received SIGNED_OUT event, but letting signOut method handle it')
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router, supabase.auth])

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true)

      // Registra tentativa de login
      await securityLogger.logEvent({
        type: SecurityEventType.LOGIN_ATTEMPT,
        ipAddress: window.location.hostname,
        userAgent: navigator.userAgent,
        details: { email }
      })

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        // Registra falha no login
        await securityLogger.logEvent({
          type: SecurityEventType.LOGIN_FAILURE,
          ipAddress: window.location.hostname,
          userAgent: navigator.userAgent,
          details: { email, error: error.message }
        })
        throw error
      }

      // Registra sucesso no login
      await securityLogger.logEvent({
        type: SecurityEventType.LOGIN_SUCCESS,
        userId: data.user?.id,
        ipAddress: window.location.hostname,
        userAgent: navigator.userAgent,
        details: { email }
      })

      setUser(data.user as AuthUser)
      router.push('/home')
    } catch (error) {
      console.error('Error logging in:', error)
      toast.error('Erro ao fazer login')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    try {
      // Não setamos loading para evitar o piscar da tela
      console.log('Starting sign out process...')

      // Registra o evento de logout
      await securityLogger.logEvent({
        type: SecurityEventType.LOGOUT,
        userId: user?.id,
        ipAddress: window.location.hostname,
        userAgent: navigator.userAgent,
        details: { timestamp: new Date().toISOString() }
      }).catch(console.error) // Não esperamos o log terminar

      // Remove o listener de autenticação e faz signOut em paralelo
      const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {})
      subscription.unsubscribe()

      // Limpa o estado local imediatamente
      setUser(null)

      // Faz o signOut e redireciona
      await supabase.auth.signOut()
      window.location.href = '/signin'
    } catch (error) {
      console.error('Error during sign out:', error)
      toast.error('Erro ao fazer logout')
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, signOut, login }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}