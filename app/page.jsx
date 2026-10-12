import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import { About, Services, Projects, Process, Testimonials, Contact, Footer } from '@/components/Sections';
import { SmoothScroll, ScrollProgress, GlobalEffects } from '@/components/ui';

export default function Home() {
  return (
    <SmoothScroll>
      <a
        href="#main"
        className="sr-only z-[70] rounded bg-accent px-4 py-2 text-on-accent focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <GlobalEffects />
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Services />
        <Projects />
        <Process />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
