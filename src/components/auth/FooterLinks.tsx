import Link from 'next/link';

interface FooterLinksProps {
  variant?: 'signin' | 'signup' | 'forgot';
}

export default function FooterLinks({ variant = 'signin' }: FooterLinksProps) {
  const isSignIn = variant === 'signin';
  const isForgot = variant === 'forgot';

  return (
    <>
      <div className="self-center my-8 text-sm">
        <span className="text-gray-400">
          {isSignIn ? 'Não tem uma conta?' : isForgot ? 'Já tem uma conta?' : 'Já tem uma conta?'}
        </span>{' '}
        <Link href={isSignIn ? '/signup' : '/signin'} className="underline hover:text-gray-200">
          {isSignIn ? 'Cadastre-se agora' : 'Entre agora'}
        </Link>
      </div>
      {!isForgot && (
        <p className="text-xs text-gray-500 text-center leading-relaxed">
          Ao continuar, você concorda com os{' '}
          <a href="https://supabase.com/terms" className="underline hover:text-gray-300">Termos de Serviço</a> e{' '}
          <a href="https://supabase.com/privacy" className="underline hover:text-gray-300">Política de Privacidade</a> do Supabase, e em receber e-mails periódicos com atualizações.
        </p>
      )}
    </>
  );
}