import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { AUTH_ROUTES, PROTECTED_ROUTES } from '@/lib/utils/config/routes'
import { SecurityLogger, SecurityEventType } from '@/infrastructure/services/security-logger'

export async function middleware(request: NextRequest) {
  const securityLogger = SecurityLogger.getInstance()
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-url', request.url)

  // Verifica se a rota é protegida ou de autenticação
  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  )
  const isAuthRoute = AUTH_ROUTES.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  )

  // Se for uma rota protegida ou de autenticação, verifica a sessão
  if (isProtectedRoute || isAuthRoute) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value
          },
          set(name: string, value: string, options: any) {
            requestHeaders.append('Set-Cookie', `${name}=${value}`)
          },
          remove(name: string, options: any) {
            requestHeaders.append('Set-Cookie', `${name}=`)
          },
        },
      }
    )

    // Verify the session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()

    // Registra tentativa de acesso a rota protegida
    if (isProtectedRoute) {
      await securityLogger.logEvent({
        type: SecurityEventType.PROTECTED_ROUTE_ACCESS,
        userId: session?.user.id,
        ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown',
        details: {
          path: request.nextUrl.pathname,
          hasUser: !!session
        }
      })
    }

    // Se estiver em uma rota protegida e não tiver usuário autenticado, redireciona para login
    if (isProtectedRoute && (!session || sessionError)) {
      return NextResponse.redirect(new URL('/signin', request.url), {
        status: 307,
        headers: {
          'Cache-Control': 'no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        }
      })
    }

    // Se estiver em uma rota de autenticação (exceto signup) e tiver usuário autenticado, redireciona para home
    if (isAuthRoute && session && !sessionError && !request.nextUrl.pathname.startsWith('/signup')) {
      return NextResponse.redirect(new URL('/home', request.url))
    }
  }

  // Adiciona headers de cache para prevenir caching em rotas protegidas
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  if (request.nextUrl.pathname.startsWith('/admin')) {
    response.headers.set('Cache-Control', 'no-store, must-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
  }

  return response
}

// Configuração do middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}