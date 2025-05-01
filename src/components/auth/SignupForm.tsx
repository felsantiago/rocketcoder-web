'use client'

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { toast } from '@/components/ui/toaster';
import { PasswordChecklist, isPasswordValid } from '@/components/ui/password-checklist';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema, type SignUpSchema } from '@/lib/validations/auth';
import { sanitizeEmail, sanitizeInput } from '@/lib/utils/password-utils';
import { supabaseBrowser } from '@/lib/supabase/browser'

export default function SignupForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState<{ email: boolean; password: boolean; confirmPassword: boolean }>({
    email: false,
    password: false,
    confirmPassword: false
  });

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      terms: false
    }
  });

  const onSubmit = async (data: SignUpSchema) => {
    if (!isPasswordValid(data.password)) return;

    setLoading(true);
    try {
      // Sanitização adicional antes do envio
      const sanitizedData = {
        email: sanitizeEmail(data.email),
        password: sanitizeInput(data.password),
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      };

      const supabase = supabaseBrowser();
      const { error } = await supabase.auth.signUp(sanitizedData);

      if (error) throw error;

      toast.success('Verifique seu email para confirmar sua conta!');

      // Pequeno delay para mostrar o loading e a mensagem de sucesso
      await new Promise(resolve => setTimeout(resolve, 1500));
      router.push('/signin');
    } catch (error) {
      console.error('Erro ao criar conta:', error);
      toast.error('Erro ao criar conta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const emailError = touched.email && !form.getValues('email') ? 'O e-mail é obrigatório' : form.formState.errors.email?.message;
  const passwordError = touched.password && !form.getValues('password') ? 'A senha é obrigatória' : form.formState.errors.password?.message;
  const confirmPasswordError = touched.confirmPassword && !form.getValues('confirmPassword') ? 'Confirme a senha' : form.formState.errors.confirmPassword?.message;
  const termsError = form.formState.errors.terms?.message;

  const isFormValid = form.formState.isValid && form.getValues('terms');

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
            onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
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

      <div className="flex flex-col gap-1 text-sm">
        <label htmlFor="password" className="text-gray-400">
          Senha
        </label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            className={`h-[42px] bg-brand-card border placeholder-gray-500 pr-20 ${
              passwordError ? 'border-red-500 focus:border-red-500' : 'border-brand-divider'
            } ${loading ? 'opacity-50' : ''}`}
            disabled={loading}
            {...form.register('password')}
            onBlur={() => setTouched(prev => ({ ...prev, password: true }))}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
              className="text-gray-400 hover:text-gray-200 focus:outline-none"
              aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
              disabled={loading}
            >
              {showPassword ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3l18 18m-6-6a3 3 0 11-4-4" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.5 10.677a2 2 0 002.823 2.823" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12c0 1.2-4 6-9 6s-9-4.8-9-6c0-1.2 4-6 9-6 .9 0 1.8.1 2.6.4" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
            {passwordError && (
              <span className="text-red-500">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" strokeWidth="2" />
                  <path strokeLinecap="round" strokeWidth="2" d="M12 8v4m0 4h.01" />
                </svg>
              </span>
            )}
          </div>
        </div>
        {passwordError && (
          <span className="text-xs text-red-500 mt-0.5">{passwordError}</span>
        )}
      </div>

      <div className="flex flex-col gap-1 text-sm">
        <label htmlFor="confirmPassword" className="text-gray-400">
          Confirme a senha
        </label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            className={`h-[42px] bg-brand-card border placeholder-gray-500 ${
              confirmPasswordError ? 'border-red-500 focus:border-red-500' : 'border-brand-divider'
            } ${loading ? 'opacity-50' : ''}`}
            disabled={loading}
            {...form.register('confirmPassword')}
            onBlur={() => setTouched(prev => ({ ...prev, confirmPassword: true }))}
          />
          {confirmPasswordError && (
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
        {confirmPasswordError && (
          <span className="text-xs text-red-500 mt-0.5">{confirmPasswordError}</span>
        )}
      </div>

      <PasswordChecklist password={form.watch('password')} />

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="terms"
          className="h-4 w-4 rounded border-gray-300 text-brand focus:ring-brand"
          {...form.register('terms')}
        />
        <label htmlFor="terms" className="text-sm text-gray-400">
          Li e aceito os termos de uso e política de privacidade
        </label>
      </div>
      {termsError && (
        <span className="text-xs text-red-500 mt-0.5">{termsError}</span>
      )}

      <Button
        type="submit"
        disabled={loading || !isFormValid}
        className={`h-[42px] w-full bg-brand hover:bg-brand-dark text-gray-900 relative ${
          loading ? 'cursor-not-allowed' : ''
        }`}
      >
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          'Criar conta'
        )}
      </Button>
    </form>
  );
}
