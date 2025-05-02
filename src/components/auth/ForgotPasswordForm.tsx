'use client'

import { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { toast } from '@/components/ui/toaster'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { forgotPasswordSchema, type ForgotPasswordSchema } from '@/lib/validations/auth'
import { sanitizeEmail } from '@/lib/utils/password-utils'
import { supabaseBrowser } from '@/lib/supabase/browser'

export function ForgotPasswordForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [touched, setTouched] = useState(false)

  const form = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: ''
    }
  })

  const onSubmit = async (data: ForgotPasswordSchema) => {
    setLoading(true)
    try {
      // Sanitização adicional antes do envio
      const sanitizedEmail = sanitizeEmail(data.email)

      const supabase = supabaseBrowser()
      const { error } = await supabase.auth.resetPasswordForEmail(sanitizedEmail, {
        redirectTo: `${window.location.origin}/reset-password`,
      })

      if (error) throw error

      toast.success('Email de redefinição enviado com sucesso!')

      // Pequeno delay para mostrar o loading e a mensagem de sucesso
      await new Promise(resolve => setTimeout(resolve, 1500))
      router.push('/signin')
    } catch (error) {
      console.error('Erro ao enviar email de redefinição:', error)
      toast.error('Erro ao enviar email. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const emailError = touched && !form.getValues('email') ? 'O e-mail é obrigatório' : form.formState.errors.email?.message

  return (
    <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-1 text-sm">
        <label htmlFor="email" className="text-gray-400">
          Email
        </label>
        <div className="relative">
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            className={`h-[42px] bg-brand-card border placeholder-gray-500 ${
              emailError ? 'border-red-500 focus:border-red-500' : 'border-brand-divider'
            } ${loading ? 'opacity-50' : ''}`}
            disabled={loading}
            {...form.register('email')}
            onBlur={() => setTouched(true)}
          />
          {emailError && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <span className="text-red-500">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" strokeWidth="2" />
                  <path strokeLinecap="round" strokeWidth="2" d="M12 8v4m0 4h.01" />
                </svg>
              </span>
            </div>
          )}
        </div>
        {emailError && (
          <span className="text-xs text-red-500 mt-0.5">{emailError}</span>
        )}
      </div>

      <Button
        type="submit"
        disabled={loading || !form.formState.isValid}
        className={`relative cursor-pointer space-x-2 text-center font-regular ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border bg-brand-400 dark:bg-brand-500 hover:bg-brand/80 dark:hover:bg-brand/50 text-foreground border-brand-500/75 dark:border-brand/30 hover:border-brand-600 dark:hover:border-brand focus-visible:outline-brand-600 data-[state=open]:bg-brand-400/80 dark:data-[state=open]:bg-brand-500/80 data-[state=open]:outline-brand-600 w-full flex items-center justify-center text-base px-4 py-2 h-[42px] ${
          loading ? 'cursor-not-allowed' : ''
        }`}
      >
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="animate-spin h-5 w-5 text-gray-900"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
        ) : (
          'Enviar email de redefinição'
        )}
      </Button>
    </form>
  )
}