'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Menu, Sparkles, X } from 'lucide-react';

const navItems = [
  { label: 'Components', href: '/components' },
  { label: 'Animations', href: '/animations' },
  { label: 'Docs', href: '/docs' },
  { label: 'Sandbox', href: '/sandbox' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="fixed left-0 right-0 top-0 z-50 px-3 pt-3 md:px-6"
      >
        <div
          className="mx-auto flex w-full max-w-6xl items-center justify-between rounded-2xl border px-3 py-2.5 md:px-4"
          style={{
            borderColor: isScrolled ? 'rgba(56, 189, 248, 0.42)' : 'rgba(56, 189, 248, 0.28)',
            background: isScrolled ? 'rgba(255, 255, 255, 0.94)' : 'rgba(244, 251, 255, 0.84)',
            backdropFilter: 'blur(18px)',
            boxShadow: isScrolled
              ? '0 16px 34px rgba(15, 65, 110, 0.2)'
              : '0 10px 24px rgba(15, 65, 110, 0.14)',
          }}
        >
          <Link href="/" className="flex items-center gap-2.5">
            <span
              className="flex h-9 w-9 items-center justify-center rounded-xl"
              style={{
                background:
                  'linear-gradient(145deg, rgba(48, 213, 255, 0.3), rgba(255, 122, 89, 0.25))',
                border: '1px solid rgba(48, 213, 255, 0.35)',
              }}
            >
              <Sparkles size={17} color="#9bf3ff" />
            </span>
            <span className="font-display text-base font-semibold text-[var(--text-primary)] md:text-lg">
              Native Bits
            </span>
          </Link>

          <nav className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-full border border-sky-200/70 bg-white/75 px-3.5 py-1.5 text-sm font-medium text-[var(--text-dim)] transition hover:border-sky-300 hover:text-[var(--text)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <Link
              href="/docs"
              className="rounded-full border border-sky-200/80 bg-white/80 px-3.5 py-2 text-sm font-semibold text-[var(--text)] transition hover:border-sky-300 hover:bg-white"
            >
              Install
            </Link>
            <Link
              href="/components"
              className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-semibold"
              style={{
                color: '#061523',
                background: 'linear-gradient(135deg, #38bdf8 0%, #f8fbff 100%)',
              }}
            >
              Explore
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-white/5 text-[var(--text-primary)] md:hidden"
          >
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed left-3 right-3 top-[78px] z-40 rounded-2xl border p-3 md:hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              borderColor: 'rgba(56, 189, 248, 0.32)',
              backdropFilter: 'blur(18px)',
              boxShadow: '0 18px 42px rgba(15, 65, 110, 0.2)',
            }}
          >
            <nav className="flex flex-col gap-1.5">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl border border-sky-200/70 bg-white/80 px-3 py-2.5 text-sm font-medium text-[var(--text-dim)] transition hover:text-[var(--text)]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
