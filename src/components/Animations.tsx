'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, ChevronRight } from 'lucide-react';
import { useState } from 'react';

type Platform = 'react-native' | 'flutter';

interface Animation {
    name: string;
    animation: object;
    bg: string;
    code: {
        'react-native': string;
        flutter: string;
    };
}

const animations: Animation[] = [
    {
        name: 'Fade In Up',
        animation: { opacity: [0, 1], y: [30, 0] },
        bg: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
        code: {
            'react-native': `import { FadeInUp } from 'mobileui-pro/animations';

<FadeInUp duration={600} delay={0}>
  <YourComponent />
</FadeInUp>`,
            flutter: `import 'package:mobileui_pro/animations.dart';

FadeInUp(
  duration: Duration(milliseconds: 600),
  delay: Duration.zero,
  child: YourWidget(),
)`
        }
    },
    {
        name: 'Scale Pop',
        animation: { scale: [0, 1.1, 1] },
        bg: 'linear-gradient(135deg, #22d3ee, #06b6d4)',
        code: {
            'react-native': `import { ScalePop } from 'mobileui-pro/animations';

<ScalePop overshoot={1.1}>
  <YourComponent />
</ScalePop>`,
            flutter: `import 'package:mobileui_pro/animations.dart';

ScalePop(
  overshoot: 1.1,
  child: YourWidget(),
)`
        }
    },
    {
        name: 'Rotate In',
        animation: { rotate: [180, 0], scale: [0, 1] },
        bg: 'linear-gradient(135deg, #ec4899, #f43f5e)',
        code: {
            'react-native': `import { RotateIn } from 'mobileui-pro/animations';

<RotateIn degrees={180} duration={500}>
  <YourComponent />
</RotateIn>`,
            flutter: `import 'package:mobileui_pro/animations.dart';

RotateIn(
  degrees: 180,
  duration: Duration(milliseconds: 500),
  child: YourWidget(),
)`
        }
    },
    {
        name: 'Slide In Right',
        animation: { x: [-50, 0], opacity: [0, 1] },
        bg: 'linear-gradient(135deg, #f59e0b, #f97316)',
        code: {
            'react-native': `import { SlideInRight } from 'mobileui-pro/animations';

<SlideInRight distance={50} duration={400}>
  <YourComponent />
</SlideInRight>`,
            flutter: `import 'package:mobileui_pro/animations.dart';

SlideInRight(
  distance: 50,
  duration: Duration(milliseconds: 400),
  child: YourWidget(),
)`
        }
    },
    {
        name: 'Bounce',
        animation: { y: [0, -20, 0] },
        bg: 'linear-gradient(135deg, #10b981, #14b8a6)',
        code: {
            'react-native': `import { Bounce } from 'mobileui-pro/animations';

<Bounce height={20} loop>
  <YourComponent />
</Bounce>`,
            flutter: `import 'package:mobileui_pro/animations.dart';

Bounce(
  height: 20,
  loop: true,
  child: YourWidget(),
)`
        }
    },
    {
        name: 'Flip',
        animation: { rotateY: [0, 180, 360] },
        bg: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
        code: {
            'react-native': `import { Flip } from 'mobileui-pro/animations';

<Flip axis="y" duration={800}>
  <YourComponent />
</Flip>`,
            flutter: `import 'package:mobileui_pro/animations.dart';

Flip(
  axis: Axis.vertical,
  duration: Duration(milliseconds: 800),
  child: YourWidget(),
)`
        }
    },
    {
        name: 'Shake',
        animation: { x: [0, -10, 10, -10, 10, 0] },
        bg: 'linear-gradient(135deg, #f43f5e, #e11d48)',
        code: {
            'react-native': `import { Shake } from 'mobileui-pro/animations';

<Shake intensity={10} onError>
  <YourComponent />
</Shake>`,
            flutter: `import 'package:mobileui_pro/animations.dart';

Shake(
  intensity: 10,
  onError: true,
  child: YourWidget(),
)`
        }
    },
    {
        name: 'Pulse',
        animation: { scale: [1, 1.05, 1], opacity: [1, 0.8, 1] },
        bg: 'linear-gradient(135deg, #a855f7, #9333ea)',
        code: {
            'react-native': `import { Pulse } from 'mobileui-pro/animations';

<Pulse scale={1.05} loop>
  <YourComponent />
</Pulse>`,
            flutter: `import 'package:mobileui_pro/animations.dart';

Pulse(
  scale: 1.05,
  loop: true,
  child: YourWidget(),
)`
        }
    }
];

export default function Animations() {
    const [platform, setPlatform] = useState<Platform>('react-native');
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const handleCopy = (index: number, code: string) => {
        navigator.clipboard.writeText(code);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <section
            id="animations"
            style={{
                padding: '100px 0',
                position: 'relative',
                background: 'linear-gradient(180deg, #060010 0%, #0a0a1a 100%)'
            }}
        >
            {/* Section border */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80%',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.3), transparent)'
            }} />

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: 'center', marginBottom: '40px' }}
                >
                    <span style={{
                        display: 'inline-block',
                        padding: '6px 14px',
                        borderRadius: '100px',
                        background: 'rgba(34, 211, 238, 0.1)',
                        border: '1px solid rgba(34, 211, 238, 0.3)',
                        fontSize: '12px',
                        color: '#22d3ee',
                        fontWeight: 500,
                        marginBottom: '20px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em'
                    }}>
                        Animations
                    </span>
                    <h2 style={{
                        fontSize: 'clamp(32px, 5vw, 48px)',
                        fontWeight: 700,
                        marginBottom: '16px',
                        background: 'linear-gradient(135deg, #ffffff, #a1a1aa)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        Stunning Animations
                    </h2>
                    <p style={{
                        fontSize: '16px',
                        color: '#71717a',
                        maxWidth: '500px',
                        margin: '0 auto'
                    }}>
                        50+ smooth, customizable animations for both platforms.
                    </p>
                </motion.div>

                {/* Platform Toggle */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ display: 'flex', justifyContent: 'center', marginBottom: '48px' }}
                >
                    <div style={{
                        display: 'inline-flex',
                        padding: '4px',
                        borderRadius: '14px',
                        background: 'rgba(13, 13, 26, 0.8)',
                        border: '1px solid rgba(34, 211, 238, 0.2)'
                    }}>
                        <button
                            onClick={() => setPlatform('react-native')}
                            style={{
                                padding: '12px 24px',
                                borderRadius: '10px',
                                fontSize: '14px',
                                fontWeight: 600,
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                background: platform === 'react-native' ? 'linear-gradient(135deg, #8b5cf6, #7c3aed)' : 'transparent',
                                color: platform === 'react-native' ? 'white' : '#71717a',
                                boxShadow: platform === 'react-native' ? '0 4px 15px rgba(139, 92, 246, 0.3)' : 'none'
                            }}
                        >
                            React Native
                        </button>
                        <button
                            onClick={() => setPlatform('flutter')}
                            style={{
                                padding: '12px 24px',
                                borderRadius: '10px',
                                fontSize: '14px',
                                fontWeight: 600,
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                background: platform === 'flutter' ? 'linear-gradient(135deg, #22d3ee, #06b6d4)' : 'transparent',
                                color: platform === 'flutter' ? 'white' : '#71717a',
                                boxShadow: platform === 'flutter' ? '0 4px 15px rgba(34, 211, 238, 0.3)' : 'none'
                            }}
                        >
                            Flutter
                        </button>
                    </div>
                </motion.div>

                {/* Animations Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '20px'
                }}>
                    {animations.map((anim, index) => (
                        <motion.div
                            key={anim.name}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            style={{
                                borderRadius: '20px',
                                background: 'rgba(13, 13, 26, 0.6)',
                                border: '1px solid rgba(139, 92, 246, 0.15)',
                                overflow: 'hidden',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {/* Preview */}
                            <div style={{
                                height: '120px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderBottom: '1px solid rgba(139, 92, 246, 0.1)'
                            }}>
                                <motion.div
                                    style={{
                                        width: '50px',
                                        height: '50px',
                                        borderRadius: '12px',
                                        background: anim.bg
                                    }}
                                    animate={anim.animation}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        repeatDelay: 0.5,
                                        ease: 'easeInOut'
                                    }}
                                />
                            </div>

                            {/* Info */}
                            <div style={{ padding: '16px 20px' }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginBottom: '8px'
                                }}>
                                    <span style={{ fontSize: '14px', fontWeight: 600, color: 'white' }}>{anim.name}</span>
                                    <motion.button
                                        onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px',
                                            padding: '6px 10px',
                                            borderRadius: '6px',
                                            background: 'rgba(34, 211, 238, 0.1)',
                                            border: 'none',
                                            color: '#22d3ee',
                                            fontSize: '11px',
                                            fontWeight: 500,
                                            cursor: 'pointer'
                                        }}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        Code
                                        <motion.span
                                            animate={{ rotate: expandedIndex === index ? 90 : 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <ChevronRight size={12} />
                                        </motion.span>
                                    </motion.button>
                                </div>

                                {/* Code Panel */}
                                <AnimatePresence>
                                    {expandedIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            style={{ overflow: 'hidden', marginTop: '12px' }}
                                        >
                                            <div style={{
                                                background: 'rgba(0, 0, 0, 0.4)',
                                                borderRadius: '10px',
                                                padding: '12px'
                                            }}>
                                                <div style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    marginBottom: '10px'
                                                }}>
                                                    <span style={{
                                                        fontSize: '10px',
                                                        color: platform === 'react-native' ? '#a78bfa' : '#22d3ee',
                                                        fontWeight: 600,
                                                        textTransform: 'uppercase'
                                                    }}>
                                                        {platform === 'react-native' ? 'React Native' : 'Flutter'}
                                                    </span>
                                                    <motion.button
                                                        onClick={() => handleCopy(index, anim.code[platform])}
                                                        style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '4px',
                                                            padding: '4px 8px',
                                                            borderRadius: '4px',
                                                            background: copiedIndex === index ? 'rgba(34, 197, 94, 0.2)' : 'rgba(139, 92, 246, 0.15)',
                                                            border: 'none',
                                                            color: copiedIndex === index ? '#22c55e' : '#a78bfa',
                                                            fontSize: '10px',
                                                            cursor: 'pointer'
                                                        }}
                                                        whileTap={{ scale: 0.95 }}
                                                    >
                                                        {copiedIndex === index ? <Check size={10} /> : <Copy size={10} />}
                                                        {copiedIndex === index ? 'Copied' : 'Copy'}
                                                    </motion.button>
                                                </div>
                                                <pre style={{
                                                    margin: 0,
                                                    fontSize: '11px',
                                                    color: '#a1a1aa',
                                                    fontFamily: 'monospace',
                                                    whiteSpace: 'pre-wrap',
                                                    lineHeight: 1.5
                                                }}>
                                                    <code>{anim.code[platform]}</code>
                                                </pre>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
