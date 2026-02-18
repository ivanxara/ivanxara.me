import { Hero } from "@/components/hero";
import { Work } from "@/components/work";
import { Experience } from "@/components/experience";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Hero />
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-32 pb-32">
        <Work />
        <Experience />
        <Contact />
      </div>
    </main>
  );
}
