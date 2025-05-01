import { AuthService } from '@/services/services/AuthService'
import type { SignupPayload } from '@/core/application/dtos/auth.dto'

export class SignupUseCase {
  constructor(private readonly authService: AuthService) { }

  async execute(payload: SignupPayload): Promise<void> {
    try {
      await this.authService.signup(payload)
    } catch (error) {
      throw error
    }
  }
}