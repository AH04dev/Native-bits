export type RegistryFileType =
  | 'registry:lib'
  | 'registry:block'
  | 'registry:component'
  | 'registry:ui'
  | 'registry:hook'
  | 'registry:theme'
  | 'registry:page'
  | 'registry:file'
  | 'registry:base'
  | 'registry:item';

export interface RegistrySourceFile {
  sourcePath: string;
  type: RegistryFileType;
  target?: string;
}

export interface RegistryCatalogItem {
  name: string;
  type: RegistryFileType;
  title: string;
  description: string;
  author: string;
  dependencies?: string[];
  registryDependencies?: string[];
  categories?: string[];
  docs?: string;
  envVars?: Record<string, string>;
  files: RegistrySourceFile[];
}

export const SHADCN_REGISTRY_NAME = 'native-bits';
export const SHADCN_REGISTRY_NAMESPACE = '@native-bits';
export const DEFAULT_REGISTRY_URL_TEMPLATE = 'http://localhost:3000/r/{name}.json';

export const shadcnRegistryCatalog: RegistryCatalogItem[] = [
  {
    name: 'dashboard',
    type: 'registry:block',
    title: 'Mobile Analytics Dashboard',
    description:
      'Animated dashboard shell with KPI cards, tabs, and progress bars built for shadcn/ui.',
    author: 'native-bits <https://nativebits.dev>',
    dependencies: ['framer-motion', 'lucide-react'],
    registryDependencies: ['badge', 'button', 'card', 'progress', 'tabs'],
    categories: ['dashboard', 'analytics', 'mobile'],
    docs: [
      '### Usage',
      '```tsx',
      "import { DashboardShell } from '@/components/native-bits/dashboard-shell'",
      '',
      'export default function Page() {',
      '  return <DashboardShell />',
      '}',
      '```',
    ].join('\n'),
    files: [
      {
        sourcePath: 'blocks/dashboard/dashboard-shell.tsx',
        type: 'registry:block',
        target: 'components/native-bits/dashboard-shell.tsx',
      },
      {
        sourcePath: 'blocks/dashboard/metric-card.tsx',
        type: 'registry:block',
        target: 'components/native-bits/metric-card.tsx',
      },
    ],
  },
  {
    name: 'motion-kpi',
    type: 'registry:component',
    title: 'Motion KPI Counter',
    description:
      'Animated KPI card with spring-driven count-up values and subtle gradient surfaces.',
    author: 'native-bits <https://nativebits.dev>',
    dependencies: ['framer-motion'],
    registryDependencies: ['badge', 'card'],
    categories: ['analytics', 'counter', 'animation'],
    docs: [
      '### Usage',
      '```tsx',
      "import { MotionKpi } from '@/components/native-bits/motion-kpi'",
      '',
      '<MotionKpi label="WAU" value={184320} suffix="+12.3%" />',
      '```',
    ].join('\n'),
    files: [
      {
        sourcePath: 'blocks/motion/motion-kpi.tsx',
        type: 'registry:component',
        target: 'components/native-bits/motion-kpi.tsx',
      },
    ],
  },
  {
    name: 'stripe-pricing',
    type: 'registry:block',
    title: 'Stripe Pricing Block',
    description:
      'Pricing cards with monthly and lifetime plans plus a Stripe Checkout API route.',
    author: 'native-bits <https://nativebits.dev>',
    dependencies: ['framer-motion', 'lucide-react', 'stripe', 'zod'],
    registryDependencies: ['badge', 'button', 'card', 'separator'],
    categories: ['payments', 'pricing', 'stripe'],
    envVars: {
      STRIPE_SECRET_KEY: 'sk_live_xxx',
      STRIPE_PRICE_MONTHLY: 'price_monthly_xxx',
      STRIPE_PRICE_LIFETIME: 'price_lifetime_xxx',
      NEXT_PUBLIC_SITE_URL: 'https://your-domain.com',
    },
    docs: [
      '### Usage',
      '```tsx',
      "import { StripePricing } from '@/components/native-bits/stripe-pricing'",
      '',
      '<StripePricing />',
      '```',
      '',
      '### Next Step',
      'Create your Stripe products and copy their price IDs into your `.env` file.',
    ].join('\n'),
    files: [
      {
        sourcePath: 'blocks/stripe/stripe-pricing.tsx',
        type: 'registry:block',
        target: 'components/native-bits/stripe-pricing.tsx',
      },
      {
        sourcePath: 'blocks/stripe/pricing.ts',
        type: 'registry:file',
        target: 'lib/native-bits/pricing.ts',
      },
      {
        sourcePath: 'blocks/stripe/checkout-route.ts',
        type: 'registry:file',
        target: 'app/api/stripe/checkout/route.ts',
      },
    ],
  },
];
