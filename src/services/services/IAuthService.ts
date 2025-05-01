import { LoginPayload, SignupPayload, ForgotPasswordPayload, ResetPasswordPayload, AuthResponse } from '../dtos/auth.dto'

export interface IAuthService {
  login(payload: LoginPayload): Promise<AuthResponse>
  signup(payload: SignupPayload): Promise<AuthResponse>
  forgotPassword(payload: ForgotPasswordPayload): Promise<void>
  resetPassword(payload: ResetPasswordPayload): Promise<void>
  logout(): Promise<void>
  refreshToken(refreshToken: string): Promise<AuthResponse>
}