import { AuthService } from '@/services/services/AuthService'
import type { ResetPasswordPayload } from '@/core/application/dtos/auth.dto'

export class ResetPasswordUseCase {
  constructor(private readonly authService: AuthService) { }

  async execute(
    payload: ResetPasswordPayload,
    accessToken: string,
    refreshToken: string | null
  ): Promise<void> {
    try {
      await this.authService.resetPassword({
        ...payload,
        accessToken,
        refreshToken
      })
    } catch (error) {
      throw error
    }
  }
}