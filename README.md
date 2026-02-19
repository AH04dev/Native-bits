# Native Bits

Premium component and motion library site built with:

- React
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- shadcn/ui registry format

It exposes a custom shadcn registry so users can install premium blocks directly:

```bash
npx shadcn@latest add @native-bits/dashboard
```

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Custom shadcn registry

This project serves registry JSON from:

- `GET /registry.json` (full index)
- `GET /r/registry.json` (full index)
- `GET /r/{name}.json` (single item)

Example:

- `http://localhost:3000/r/dashboard.json`
- `http://localhost:3000/r/stripe-pricing.json`

`components.json` is already configured with:

```json
{
  "registries": {
    "@native-bits": "http://localhost:3000/r/{name}.json"
  }
}
```

To publish in production, replace the URL with your deployed domain.

## Registry source files

Installable item source lives in:

- `src/registry/shadcn/blocks/dashboard/*`
- `src/registry/shadcn/blocks/motion/*`
- `src/registry/shadcn/blocks/stripe/*`

Registry metadata is defined in:

- `src/lib/shadcn-registry-catalog.ts`

Route handlers:

- `src/app/r/[name]/route.ts`
- `src/app/registry.json/route.ts`

## Stripe setup (for `stripe-pricing`)

Set these environment variables:

```bash
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_PRICE_MONTHLY=price_monthly_xxx
STRIPE_PRICE_LIFETIME=price_lifetime_xxx
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

The registry block includes an API route file target:

- `app/api/stripe/checkout/route.ts`

## Quality checks

```bash
npm run lint
npm run build
```
