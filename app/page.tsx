import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { ServiceCalculator } from '@/components/service-calculator'
import { Footer } from '@/components/footer'

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <ServiceCalculator />
      </main>
      <Footer />
    </div>
  )
}
