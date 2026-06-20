import Navbar from '@/components/ui/navbar'
import Hero from '@/components/ui/landing/hero'
import Stats from '@/components/ui/landing/stats'
import HowItWorks from '@/components/ui/landing/how-it-works'
import Features from '@/components/ui/landing/features'
import CTA from '@/components/ui/landing/cta'
import FAQ from '@/components/ui/landing/faq'
import Footer from '@/components/ui/landing/footer'
import { Marquee, MarqueeFade, MarqueeItem, MarqueeContent } from '@/components/ui/landing/marquee'

export default function Home() {
   const companies = [
    { name: "Supabase", domain: "supabase.com" },
    { name: "Resend", domain: "resend.com" },
    { name: "Linear", domain: "linear.app" },
    { name: "Clerk", domain: "clerk.com" },
    { name: "Neon", domain: "neon.tech" },
    { name: "Railway", domain: "railway.app" },
    { name: "Render", domain: "render.com" },
    { name: "Sentry", domain: "sentry.io" },
    { name: "v0", domain: "v0.dev" },
    { name: "PostHog", domain: "posthog.com" },
  ]
  return (
    <>
      <Navbar />
      <main className="pt-40 px-8 md:px-24 min-h-screen">
        <Hero />
        <Stats />
        <Marquee className='mt-20'>
          <MarqueeFade side='left' />
          <MarqueeFade side='right' />
          <MarqueeContent>
            {companies.map((company, index) => (
              <MarqueeItem key={index} className="flex items-center gap-3 px-8 text-foreground/40 hover:text-foreground/90 transition-all duration-200 select-none cursor-pointer group">
                <img src={`https://www.google.com/s2/favicons?domain=${company.domain}&sz=128`} alt={`${company.name} logo`} className="w-12 h-12 rounded-md filter grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 object-contain"/>
                <span className="font-sans font-medium text-base tracking-tight">{company.name}</span>
              </MarqueeItem>
            ))}
          </MarqueeContent>
        </Marquee>
        <HowItWorks />
        <Features />
        <CTA />
        <FAQ />
      </main>

      <Footer />
    </>
  )
}