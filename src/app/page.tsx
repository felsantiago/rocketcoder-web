import { Footer } from '@/components/landing/Footer'
import { Hero } from '@/components/landing/Hero'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { Pricing } from '@/components/landing/Pricing'
import { Features } from '@/components/landing/Features'
import { Header } from '@/components/landing/Header'

export default function Home() {
  return (
    <div className="relative w-full">
      <Header />
      <Hero />

      {/* Agrupa Features + Spotlight + HowItWorks em um container relative */}
      <div className="relative w-full">
        <Features />

        {/* <div className="absolute inset-0 top-auto bottom-0 z-50 pointer-events-none translate-y-[-3550px]">
          <Spotlight />
        </div> */}
        {/* <HowItWorks /> */}

        <Pricing />
      </div>
      {/* <CallToAction /> */}

      <Footer />
    </div>
  )
}