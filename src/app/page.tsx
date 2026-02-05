import {
  Navbar,
  Hero,
  FeatureCards,
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
      <FeatureCards />
      <ComponentShowcase />
      <Features />
      <Animations />

      <CTA />
      <Footer />
    </main>
  );
}
