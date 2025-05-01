// src/shared/errors/mapApiErrorMessage.ts
interface ApiError {
  statusCode: number
  message: string
  code?: string
}

export function mapApiErrorMessage(error: ApiError | unknown): string {
  if (typeof error !== 'object' || error === null) return 'Erro desconhecido.'

  const code = (error as ApiError).code
  const message = (error as ApiError).message

  switch (code) {
    case 'email_not_confirmed':
      return 'Seu e-mail ainda não foi confirmado. Verifique sua caixa de entrada.'

    case 'same_password':
      return 'A nova senha deve ser diferente da senha anterior.'

    case 'invalid_login_credentials':
      return 'E-mail ou senha inválidos.'

    case 'user_not_found':
      return 'Usuário não encontrado.'

    case 'over_email_send_rate_limit':
      return 'Não foi possível recuperar a senha, tente novamente'

    case 'validation_error':
      return 'Alguns campos estão inválidos. Verifique e tente novamente.'

    case 'internal_error':
      return 'Ocorreu um erro interno. Tente novamente mais tarde.'

    case "user_already_exists":
      return 'Esse e-mail já está cadastrado. Tente fazer login.'

    case "email_not_found_forgot_password":
      return 'Não foi possível recuperar a senha, tente novamente'

    case "invalid_credentials":
      return 'E-mail ou senha inválidos.'

    default:
      return message || 'Erro inesperado. Tente novamente.'
  }
}