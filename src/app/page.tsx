import {
  Navbar,
  Hero,
  Features,
  ComponentShowcase,
  Animations,
  Pricing,
  CTA,
  Footer,
} from '@/components';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ComponentShowcase />
      <Features />
      <Animations />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  );
}
