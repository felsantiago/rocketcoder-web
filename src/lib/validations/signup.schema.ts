import { z } from 'zod'
import { supabaseSecurityConfig } from '@infrastructure/config/supabase-security'

export const signupSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string()
    .min(supabaseSecurityConfig.passwordPolicy.minLength, `A senha deve ter no mínimo ${supabaseSecurityConfig.passwordPolicy.minLength} caracteres`)
    .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
    .regex(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula')
    .regex(/[0-9]/, 'A senha deve conter pelo menos um número')
    .regex(/[!@#$%^&*(),.?":{}|<>]/, 'A senha deve conter pelo menos um caractere especial'),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: 'Você precisa aceitar os termos de uso e a política de privacidade',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword'],
})

export type SignupSchema = z.infer<typeof signupSchema>