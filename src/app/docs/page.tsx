'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Check,
  Copy,
  Layers,
  Sparkles,
  TerminalSquare,
} from 'lucide-react';
import { Footer, Navbar } from '@/components';
import { animations, components } from '@/registry';
import {
  DEFAULT_REGISTRY_URL_TEMPLATE,
  SHADCN_REGISTRY_NAMESPACE,
  shadcnRegistryCatalog,
} from '@/lib/shadcn-registry-catalog';

const installCommand = `npx shadcn@latest add ${SHADCN_REGISTRY_NAMESPACE}/dashboard`;

const steps = [
  {
    step: '01',
    title: 'Initialize shadcn/ui',
    code: 'npx shadcn@latest init',
  },
  {
    step: '02',
    title: 'Configure registry namespace',
    code: `// components.json
{
  "registries": {
    "${SHADCN_REGISTRY_NAMESPACE}": "${DEFAULT_REGISTRY_URL_TEMPLATE}"
  }
}`,
  },
  {
    step: '03',
    title: 'Install premium block',
    code: installCommand,
  },
];

export default function DocsPage() {
  const [copied, setCopied] = useState(false);
  const componentsPreview = useMemo(() => components.slice(0, 8), []);
  const animationsPreview = useMemo(() => animations.slice(0, 8), []);

  const copyInstall = async () => {
    await navigator.clipboard.writeText(installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <main>
      <Navbar />

      <section className="ui-section pt-28">
        <div className="ui-container">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="section-kicker">
              <TerminalSquare size={13} />
              Docs
            </span>
            <h1 className="section-title mt-4">
              Install premium blocks with
              <span className="text-gradient-cyan"> shadcn registry</span>
            </h1>
            <p className="section-subtitle mt-4">
              React + Next.js + TypeScript + Tailwind CSS components that users can install with
              one command.
            </p>

            <button
              type="button"
              onClick={copyInstall}
              className="code-shell mt-6 inline-flex items-center gap-3 rounded-2xl px-5 py-3 text-sm font-semibold text-slate-200"
            >
              <span className="text-[var(--text-muted)]">$</span>
              {installCommand}
              {copied ? (
                <Check size={14} color="#dff3ff" />
              ) : (
                <Copy size={14} color="#a7b4d4" />
              )}
            </button>
          </motion.div>

          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {[
              { title: 'React', value: '19' },
              { title: 'Next.js', value: '16' },
              { title: 'Tailwind', value: 'v4' },
              { title: 'Payments', value: 'Stripe' },
            ].map((item) => (
              <article key={item.title} className="glass rounded-2xl p-4">
                <p className="text-xs uppercase tracking-[0.1em] text-[var(--text-muted)]">
                  {item.title}
                </p>
                <p className="mt-2 font-display text-2xl font-semibold text-white">
                  {item.value}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {steps.map((item) => (
              <article key={item.step} className="glass rounded-2xl p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--text-muted)]">
                  Step {item.step}
                </p>
                <h2 className="font-display mt-2 text-xl font-semibold text-white">
                  {item.title}
                </h2>
                <pre className="code-shell mt-3 overflow-x-auto rounded-xl p-3 text-xs leading-6 text-slate-200">
                  <code>{item.code}</code>
                </pre>
              </article>
            ))}
          </div>

          <section className="mt-10">
            <div className="mb-4 flex items-center gap-2">
              <Layers size={18} color="#38bdf8" />
              <h2 className="font-display text-2xl font-semibold text-white">
                Registry blocks
              </h2>
            </div>

            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {shadcnRegistryCatalog.map((item) => (
                <article key={item.name} className="glass rounded-2xl p-4">
                  <p className="text-xs uppercase tracking-[0.1em] text-[var(--text-muted)]">
                    {item.type.replace('registry:', '')}
                  </p>
                  <h3 className="font-display mt-2 text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--text-dim)]">
                    {item.description}
                  </p>
                  <pre className="code-shell mt-3 overflow-x-auto rounded-xl p-2.5 text-[11px] leading-6 text-slate-200">
                    <code>{`npx shadcn@latest add ${SHADCN_REGISTRY_NAMESPACE}/${item.name}`}</code>
                  </pre>
                </article>
              ))}
            </div>
          </section>

          <div className="mt-10 space-y-10">
            <section>
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Layers size={18} color="#38bdf8" />
                  <h2 className="font-display text-2xl font-semibold text-white">Components</h2>
                </div>
                <Link
                  href="/components"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--text-dim)] hover:text-white"
                >
                  View all
                  <ArrowRight size={14} />
                </Link>
              </div>

              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                {componentsPreview.map((item) => (
                  <Link key={item.slug} href={`/docs/components/${item.slug}`}>
                    <article className="glass h-full rounded-2xl p-4 transition hover:-translate-y-0.5">
                      <h3 className="font-display text-lg font-semibold text-white">
                        {item.name}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-[var(--text-dim)]">
                        {item.description}
                      </p>
                    </article>
                  </Link>
                ))}
              </div>
            </section>

            <section>
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Sparkles size={18} color="#60a5fa" />
                  <h2 className="font-display text-2xl font-semibold text-white">Animations</h2>
                </div>
                <Link
                  href="/animations"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--text-dim)] hover:text-white"
                >
                  View all
                  <ArrowRight size={14} />
                </Link>
              </div>

              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                {animationsPreview.map((item) => (
                  <Link key={item.slug} href={`/docs/animations/${item.slug}`}>
                    <article className="glass h-full rounded-2xl p-4 transition hover:-translate-y-0.5">
                      <h3 className="font-display text-lg font-semibold text-white">
                        {item.name}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-[var(--text-dim)]">
                        {item.description}
                      </p>
                    </article>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
