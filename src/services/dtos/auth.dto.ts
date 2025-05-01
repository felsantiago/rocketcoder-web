export interface LoginPayload {
  email: string
  password: string
}

export interface SignupPayload {
  email: string
  password: string
}

export interface ForgotPasswordPayload {
  email: string
}

export interface ResetPasswordPayload {
  new_password: string
  confirm_password: string
}

export interface AuthResponse {
  access_token: string
  refresh_token: string
  user: {
    id: string
    email: string
    created_at: string
    updated_at: string
  }
}

export interface ErrorResponse {
  message: string
  status: number
  errors?: Record<string, string[]>
}