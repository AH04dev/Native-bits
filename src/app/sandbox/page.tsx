'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Copy, Monitor, Play, RefreshCcw, Smartphone, Tablet } from 'lucide-react';
import { Footer, Navbar } from '@/components';

type Platform = 'react-native' | 'flutter';
type Device = 'phone' | 'tablet' | 'desktop';
type Template = 'button' | 'card' | 'animation';

const snippets = {
  'react-native': {
    button: `import AnimatedButton from './native-bits/animated-button';

<AnimatedButton
  title="Pay now"
  onPress={submitOrder}
/>`,
    card: `import GlassCard from './native-bits/glass-card';

<GlassCard intensity={42}>
  <ProfileSummary />
</GlassCard>`,
    animation: `import FadeInUp from './native-bits/fade-in-up';

<FadeInUp delay={120}>
  <StatsPanel />
</FadeInUp>`,
  },
  flutter: {
    button: `import 'package:native_bits/native_bits.dart';

AnimatedButton(
  text: 'Pay now',
  onPressed: submitOrder,
)`,
    card: `import 'package:native_bits/native_bits.dart';

GlassCard(
  intensity: 42,
  child: ProfileSummary(),
)`,
    animation: `import 'package:native_bits/animations.dart';

FadeInUp(
  delay: const Duration(milliseconds: 120),
  child: StatsPanel(),
)`,
  },
} as const;

const deviceSize: Record<Device, { width: string; height: string }> = {
  phone: { width: '320px', height: '620px' },
  tablet: { width: '440px', height: '620px' },
  desktop: { width: '100%', height: '100%' },
};

export default function SandboxPage() {
  const [platform, setPlatform] = useState<Platform>('react-native');
  const [template, setTemplate] = useState<Template>('button');
  const [device, setDevice] = useState<Device>('phone');
  const [running, setRunning] = useState(true);
  const [copied, setCopied] = useState(false);
  const [logs, setLogs] = useState<string[]>(['> Sandbox ready', '> Select a template']);

  const code = useMemo(() => snippets[platform][template], [platform, template]);

  const copyCode = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const runPreview = () => {
    setRunning(false);
    setLogs((prev) => [...prev, '> Building preview...']);

    setTimeout(() => {
      setRunning(true);
      setLogs((prev) => [...prev, '> Build complete', '> Preview synced']);
    }, 600);
  };

  return (
    <main>
      <Navbar />

      <section className="ui-section pt-28">
        <div className="ui-container">
          <div className="mb-5">
            <span className="section-kicker">Sandbox</span>
            <h1 className="section-title mt-4">Live mobile preview workspace</h1>
            <p className="section-subtitle mt-4 max-w-3xl">
              Switch between React Native and Flutter snippets, preview UI behavior, and validate
              design decisions quickly.
            </p>
          </div>

          <div className="grid gap-4 xl:grid-cols-[1.04fr_0.96fr]">
            <section className="glass rounded-3xl p-4 md:p-5">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-1 rounded-full border border-white/20 bg-white/5 p-1">
                  {(['react-native', 'flutter'] as Platform[]).map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setPlatform(option)}
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] ${
                        platform === option
                          ? 'bg-[linear-gradient(135deg,#38bdf8_0%,#f8fbff_100%)] text-[#031321]'
                          : 'text-[var(--text-dim)]'
                      }`}
                    >
                      {option === 'react-native' ? 'React Native' : 'Flutter'}
                    </button>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {(['button', 'card', 'animation'] as Template[]).map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setTemplate(item)}
                      className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] ${
                        template === item
                          ? 'border-cyan-300/70 bg-cyan-300/20 text-cyan-100'
                          : 'border-white/20 bg-white/5 text-[var(--text-muted)]'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="code-shell rounded-2xl p-3">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.1em] text-[var(--text-muted)]">
                    {platform === 'react-native' ? 'TypeScript' : 'Dart'}
                  </p>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setLogs((prev) => [...prev, '> Template reset'])}
                      className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--text-dim)]"
                    >
                      <RefreshCcw size={11} />
                      Reset
                    </button>
                    <button
                      type="button"
                      onClick={copyCode}
                      className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--text-dim)]"
                    >
                      {copied ? <Check size={11} /> : <Copy size={11} />}
                      {copied ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </div>

                <textarea
                  value={code}
                  readOnly
                  spellCheck={false}
                  className="h-[380px] w-full resize-none rounded-xl border border-white/10 bg-slate-950/70 p-3 font-mono text-xs leading-6 text-slate-200 outline-none"
                />
              </div>

              <div className="mt-3 rounded-2xl border border-white/10 bg-slate-950/50 p-3">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--text-muted)]">Console</p>
                <div className="max-h-28 space-y-1 overflow-auto pr-1">
                  {logs.map((line, index) => (
                    <p key={`${line}-${index}`} className="font-mono text-xs text-[var(--text-dim)]">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </section>

            <section className="glass rounded-3xl p-4 md:p-5">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { id: 'phone', icon: Smartphone },
                    { id: 'tablet', icon: Tablet },
                    { id: 'desktop', icon: Monitor },
                  ].map(({ id, icon: Icon }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setDevice(id as Device)}
                      className={`rounded-full border p-2 ${
                        device === id
                          ? 'border-cyan-300/70 bg-cyan-300/20 text-cyan-100'
                          : 'border-white/20 bg-white/5 text-[var(--text-dim)]'
                      }`}
                    >
                      <Icon size={14} />
                    </button>
                  ))}
                </div>

                <button type="button" onClick={runPreview} className="btn-solid text-xs uppercase tracking-[0.08em]">
                  <Play size={12} />
                  Run
                </button>
              </div>

              <div className="flex min-h-[470px] items-center justify-center rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                <motion.div
                  key={`${device}-${running}-${template}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    width: deviceSize[device].width,
                    height: deviceSize[device].height,
                    maxWidth: '100%',
                    maxHeight: '100%',
                  }}
                >
                  <div
                    className={`h-full w-full overflow-hidden ${
                      device === 'desktop'
                        ? 'rounded-2xl border border-white/20'
                        : 'phone-shell rounded-[2rem] border border-white/20 p-2'
                    }`}
                  >
                    <div className="flex h-full w-full items-center justify-center rounded-[1.5rem] bg-[linear-gradient(180deg,rgba(10,18,35,0.95),rgba(6,12,24,0.98))] p-4">
                      {running ? (
                        <div className="text-center">
                          {template === 'button' && (
                            <button className="btn-solid" onClick={() => setLogs((prev) => [...prev, '> Button pressed'])}>
                              Pay now
                            </button>
                          )}
                          {template === 'card' && (
                            <div className="glass w-56 rounded-2xl p-4 text-left">
                              <div className="mb-3 h-8 w-8 rounded-lg bg-cyan-300/80" />
                              <p className="font-display text-xl font-semibold text-white">Member tier</p>
                              <p className="mt-1 text-xs text-[var(--text-dim)]">Gold account active</p>
                            </div>
                          )}
                          {template === 'animation' && (
                            <>
                              <p className="font-display text-2xl font-semibold text-white">Motion Preview</p>
                              <motion.div
                                className="mx-auto mt-5 h-14 w-14 rounded-2xl"
                                style={{ background: 'linear-gradient(135deg, #38bdf8 0%, #f8fbff 100%)' }}
                                animate={{ y: [0, -18, 0] }}
                                transition={{ duration: 1, repeat: Infinity }}
                              />
                            </>
                          )}
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          {[0, 1, 2].map((dot) => (
                            <motion.span
                              key={dot}
                              className="h-2.5 w-2.5 rounded-full bg-cyan-300"
                              animate={{ scale: [1, 1.35, 1], opacity: [0.45, 1, 0.45] }}
                              transition={{ duration: 0.8, repeat: Infinity, delay: dot * 0.14 }}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

