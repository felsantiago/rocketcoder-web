import { z } from 'zod'

export const resetPasswordSchema = z.object({
  new_password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
  confirm_password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
}).refine((data) => data.new_password === data.confirm_password, {
  message: 'As senhas não coincidem',
  path: ['confirm_password'],
})

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>