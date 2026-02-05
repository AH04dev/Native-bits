import {
  Navbar,
  Hero,
  Features,
  ComponentShowcase,
  Animations,
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

      <CTA />
      <Footer />
    </main>
  );
}
