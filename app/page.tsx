import { Faq } from "@/components/faq";
import { Features } from "@/components/features";
import Hero from "@/components/hero";
import { Pricing } from "@/components/pricing";

export default function Home() {
  return (
    <main>
      <section id="home">
        <Hero />
      </section>
      <section id="features">
        <Features />
      </section>
      <section id="pricing">
        <Pricing />
      </section>
      <section id="faq">
        <Faq />
      </section>
    </main>
  );
}
