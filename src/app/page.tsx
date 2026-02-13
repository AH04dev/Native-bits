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
      <ComponentShowcase previewOnly />
      <Features />
      <Animations previewOnly />

      <CTA />
      <Footer />
    </main>
  );
}
