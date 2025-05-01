'use client'

import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabaseClient } from '@/lib/supabase/client';
import { toast } from '@/components/ui/toaster';
import { LoadingSpinner } from '../ui/loading-spinner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { authSchema, type AuthSchema } from '@/lib/validations/auth';
import { sanitizeEmail, sanitizeInput } from '@/lib/utils/password-utils';
import Link from 'next/link';

export function SignInForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState<{ email: boolean; password: boolean }>({ email: false, password: false });

  const form = useForm<AuthSchema>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data: AuthSchema) => {
    setLoading(true);
    try {
      // Sanitização adicional antes do envio
      const sanitizedData = {
        email: sanitizeEmail(data.email),
        password: sanitizeInput(data.password)
      };

      const supabase = getSupabaseClient();
      const { error } = await supabase.auth.signInWithPassword(sanitizedData);

      if (error) {
        throw error;
      }

      toast.success('Login realizado com sucesso!');

      // Pequeno delay para mostrar o loading e a mensagem de sucesso
      await new Promise(resolve => setTimeout(resolve, 1500));
      router.push('/home');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      toast.error('Erro ao fazer login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  const emailError = touched.email && !form.getValues('email') ? 'O e-mail é obrigatório' : form.formState.errors.email?.message;
  const passwordError = touched.password && !form.getValues('password') ? 'A senha é obrigatória' : form.formState.errors.password?.message;

  const isFormValid = form.formState.isValid;

  return (
    <form className="flex flex-col gap-4" id="signIn-form" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-1 text-sm">
        <label htmlFor="email" className="text-gray-400">
          E-mail
        </label>
        <div className="relative">
          <Input
            id="email"
            type="email"
            placeholder="voce@exemplo.com"
            className={`h-[42px] bg-brand-card border placeholder-gray-500 pr-10 ${
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
          <span className="text-xs text-red-500 mt-0.5">
            {emailError}
          </span>
        )}
      </div>
      <div className="relative flex flex-col gap-1 text-sm">
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
          <span className="text-xs text-red-500 mt-0.5">
            {passwordError}
          </span>
        )}
        <Link href="/forgot-password" className="absolute top-0 right-0 text-sm text-gray-400 hover:text-gray-300">
          Esqueceu a senha?
        </Link>
      </div>
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
          'Entrar'
        )}
      </Button>
    </form>
  );
}