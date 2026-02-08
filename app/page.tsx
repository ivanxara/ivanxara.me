import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Work } from "@/components/work"
import { Experience } from "@/components/experience"
import { Contact } from "@/components/contact"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <Header />
        <Hero />
        <Work />
        <Experience />
        <Contact />
      </div>
    </main>
  )
}
