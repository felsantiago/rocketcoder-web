import { NextRequest, NextResponse } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { AUTH_ROUTES, PROTECTED_ROUTES } from '@/lib/utils/config/routes'

export async function middleware(req: NextRequest) {
  /* 1 – precisamos da response para que setAll grave os cookies */
  const res = NextResponse.next()

  /* 2 – instancia o client com adapter (getAll / setAll) */
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name: string) => req.cookies.get(name)?.value,
        set: (name: string, value: string, options: CookieOptions) => {
          res.cookies.set(name, value, options)
        },
        remove: (name: string, options: CookieOptions) => {
          res.cookies.set(name, '', { ...options, maxAge: 0 })
        }
      }
    }
  )

  /* 3 – lógica de proteção */
  const { data: { user } } = await supabase.auth.getUser()

  const path = req.nextUrl.pathname
  const isProtected = PROTECTED_ROUTES.some(r => path.startsWith(r))
  const isAuthPage = AUTH_ROUTES.some(r => path.startsWith(r))

  // Check if the request is coming from desktop app
  const isDesktopApp = req.nextUrl.searchParams.get('source') === 'desktop'

  if (isProtected && !user) {
    return NextResponse.redirect(new URL('/signin', req.url))
  }

  if (isAuthPage && user) {
    // If request is from desktop app, redirect to success page
    if (isDesktopApp && !path.startsWith('/auth/success')) {
      return NextResponse.redirect(new URL('/auth/success', req.url))
    }
    // Otherwise redirect to home as usual
    if (!path.startsWith('/signup') && !isDesktopApp) {
      return NextResponse.redirect(new URL('/home', req.url))
    }
  }

  return res     // cookies de refresh já anexados
}

/* quais rotas o middleware intercepta */
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|public).*)']
}