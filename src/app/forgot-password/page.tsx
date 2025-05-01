// src/app/forgot-password/page.tsx

'use client'

import LogoNavbar from '@/components/auth/LogoNavbar'
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm"
import FooterLinks from '@/components/auth/FooterLinks'

export default function ForgotPasswordPage() {
  return (
    <div className="flex flex-col h-screen w-screen bg-alternative text-foreground">
      <LogoNavbar />
      <div className="flex flex-1 overflow-y-hidden">
        {/* Main content */}
        <main className="flex flex-col flex-1 items-center justify-center px-5 pb-8 bg-studio">
          <div className="flex flex-col justify-center w-[330px] sm:w-[384px]">
            {/* Heading */}
            <div className="mb-10">
              <h1 className="mt-8 mb-2 text-2xl lg:text-3xl text-white">Recuperar senha</h1>
              <h2 className="text-sm text-gray-400">Digite seu e-mail para receber o link de recuperação</h2>
            </div>
            <ForgotPasswordForm />
            <FooterLinks variant="forgot" />
          </div>
        </main>
      </div>
    </div>
  )
}