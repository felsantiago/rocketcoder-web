// src/app/layout.tsx
import './globals.css'
import { Providers } from '@/providers/Providers'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { calsans } from '@/lib/fonts/calsans'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Scriptix - Future-Driven Software Development',
  description: 'We craft high-quality digital solutions that help businesses grow, scale, and innovate in a fast-changing world.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.className} ${calsans.variable}`}>
      <body className="bg-black text-white">
        <Providers authUser={null}>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  )
}