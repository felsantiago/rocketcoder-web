export interface ResetPasswordPayload {
  new_password: string
  confirm_password: string
}

export interface SignupPayload {
  email: string
  password: string
}