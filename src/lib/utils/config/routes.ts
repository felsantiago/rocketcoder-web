export const AUTH_ROUTES = ['/signin', '/signup', '/forgot-password', '/reset-password'] as const
export const PROTECTED_ROUTES = ['/home', '/dashboard'] as const

export const ROUTES = {
  HOME: '/home',
  DASHBOARD: '/dashboard',
  SIGN_IN: '/signin',
  SIGN_UP: '/signup',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
} as const