'use client'

// src/app/signup/page.tsx
import LogoNavbar from '@/components/auth/LogoNavbar'
import SocialAuthButtons from '@/components/auth/SocialAuthButtons'
import SignupForm from '@/components/auth/SignupForm'
import FooterLinks from '@/components/auth/FooterLinks'
import Image from 'next/image'

export default function SignupPage() {
  return (
    <div className="flex flex-col h-screen w-screen bg-alternative text-foreground">
      <LogoNavbar />
      <div className="flex flex-1 overflow-y-hidden pt-0">
        {/* Left pane (form) */}
        <main className="flex flex-col flex-1 flex-shrink-0 items-center px-5 pb-8 border-r border-brand-divider shadow-lg bg-studio pt-16">
          <div className="flex flex-col justify-center flex-1 w-[330px] sm:w-[384px]">
            {/* Heading */}
            <div className="mb-10">
              <h1 className="mt-8 mb-2 text-2xl lg:text-3xl text-white">Comece agora</h1>
              <h2 className="text-sm text-gray-400">Crie uma nova conta</h2>
            </div>
            <SocialAuthButtons showSSO={false} />
            {/* Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-brand-divider" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-2 text-sm text-gray-400 bg-studio">ou</span>
              </div>
            </div>
            <SignupForm />
            <FooterLinks variant="signup" />
          </div>
        </main>
        {/* Aside testimonial customizado para signup */}
        <aside className="hidden xl:flex flex-1 flex-col items-center justify-center bg-alternative">
          <div className="relative max-w-lg px-8">
            <span className="absolute -top-12 -left-11 text-[160px] leading-none text-gray-700/30 select-none">
              "
            </span>
            <blockquote className="relative z-10 text-3xl text-white">
              Trabalhar com o @supabase tem sido uma das melhores experiências de desenvolvimento que tive ultimamente. Incrivelmente fácil de configurar, ótima documentação e muito menos obstáculos para superar do que a concorrência.
            </blockquote>
            <a
              href="https://twitter.com/thatguy_tex/status/1497602628410388480"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-center gap-4"
            >
              <Image
                src="https://supabase.com/images/twitter-profiles/09HouOSt_400x400.jpg"
                alt="thatguy_tex"
                width={48}
                height={48}
                className="rounded-full"
              />
              <cite className="not-italic font-medium text-gray-400">@thatguy_tex</cite>
            </a>
          </div>
        </aside>
      </div>
    </div>
  )
}