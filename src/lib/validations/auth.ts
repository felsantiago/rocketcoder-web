import { z } from "zod"
import { isStrongPassword, sanitizeEmail, sanitizeInput } from "@/lib/utils/password-utils"

// Regex para validação de email
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

// Schema base para autenticação
export const authSchema = z.object({
  email: z
    .string()
    .min(1, "Email é obrigatório")
    .email("Email inválido")
    .regex(EMAIL_REGEX, "Formato de email inválido")
    .transform(sanitizeEmail),
  password: z
    .string()
    .min(8, "Senha deve ter no mínimo 8 caracteres")
    .max(100, "Senha muito longa")
    .refine((password) => isStrongPassword(password), {
      message: "Senha deve conter letras maiúsculas, minúsculas, números e caracteres especiais"
    })
    .transform(sanitizeInput)
})

// Schema para signup
export const signUpSchema = authSchema.extend({
  confirmPassword: z.string(),
  terms: z.boolean().refine((value) => value === true, {
    message: "Você precisa aceitar os termos de uso"
  })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Senhas não conferem",
  path: ["confirmPassword"]
})

// Schema para recuperação de senha
export const forgotPasswordSchema = z.object({
  email: authSchema.shape.email
})

// Schema para reset de senha
export const resetPasswordSchema = z.object({
  password: z.string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
    .regex(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula')
    .regex(/[0-9]/, 'A senha deve conter pelo menos um número')
    .regex(/[^A-Za-z0-9]/, 'A senha deve conter pelo menos um caractere especial'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Senhas não conferem",
  path: ["confirmPassword"]
})

// Tipos inferidos dos schemas
export type AuthSchema = z.infer<typeof authSchema>
export type SignUpSchema = z.infer<typeof signUpSchema>
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>