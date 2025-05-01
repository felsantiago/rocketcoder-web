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
        getAll: () => req.cookies.getAll(),
        setAll: (items) => {
          items.forEach(({ name, value, options }) =>
            res.cookies.set(name, value, options as CookieOptions)
          )
          return res           // ← obrigatório
        }
      },
      headers: { get: (k) => req.headers.get(k) ?? undefined }
    }
  )

  /* 3 – lógica de proteção */
  const { data: { user } } = await supabase.auth.getUser()

  const path = req.nextUrl.pathname
  const isProtected = PROTECTED_ROUTES.some(r => path.startsWith(r))
  const isAuthPage = AUTH_ROUTES.some(r => path.startsWith(r))

  if (isProtected && !user) {
    return NextResponse.redirect(new URL('/signin', req.url))
  }
  if (isAuthPage && user && !path.startsWith('/signup')) {
    return NextResponse.redirect(new URL('/home', req.url))
  }

  return res     // cookies de refresh já anexados
}

/* quais rotas o middleware intercepta */
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|public).*)']
}