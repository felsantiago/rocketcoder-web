'use client'

import LogoNavbar from '@/components/auth/LogoNavbar';
import SocialAuthButtons from '@/components/auth/SocialAuthButtons';
import { SignInForm } from '@/components/auth/SignInForm';
import AsideTestimonial from '@/components/auth/AsideTestimonial';
import FooterLinks from '@/components/auth/FooterLinks';

export default function LoginPage() {
  return (
    <div className="flex flex-col h-screen w-screen bg-alternative text-foreground">
      <LogoNavbar />
      <div className="flex flex-1 overflow-y-hidden">
        {/* Left pane (form) */}
        <main className="flex flex-col flex-shrink-0 flex-1 items-center px-5 pb-8 border-r border-brand-divider shadow-lg bg-studio pt-16 overflow-y-auto max-w-[760pxpx]">
          <div className="flex flex-col justify-center w-[330px] sm:w-[384px] flex-1">
            {/* Heading */}
            <div className="mb-10">
              <h1 className="mt-8 mb-2 text-2xl lg:text-3xl text-white">Bem-vindo de volta</h1>
              <h2 className="text-sm text-gray-400">Entre na sua conta</h2>
            </div>
            <SocialAuthButtons />
            {/* divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-brand-divider" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-2 text-sm text-gray-400 bg-studio">ou</span>
              </div>
            </div>
            <SignInForm />
            <FooterLinks variant="signin" />
          </div>
        </main>
        <AsideTestimonial />
      </div>
    </div>
  );
}
