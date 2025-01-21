import { Hero } from "@/components/landing/hero"
import { Features } from "@/components/landing/features"
import { QuickAccess } from "@/components/landing/quick-access"
import { Footer } from "@/components/landing/footer"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <Hero />
        <Features />
        <QuickAccess />
      </main>
      <Footer />
    </div>
  )
}

