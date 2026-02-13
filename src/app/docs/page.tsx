'use client';

import { motion } from 'framer-motion';
import { Copy, Check, Package, Zap, ArrowRight, Boxes, Sparkles } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { components, animations } from '@/registry';

export default function DocsPage() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText('npx native-bits init');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div style={{ minHeight: '100vh', background: '#050505', paddingTop: '100px' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px' }}>

                {/* Hero */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ textAlign: 'center', marginBottom: '64px' }}
                >
                    <motion.span
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '8px 16px',
                            borderRadius: '100px',
                            background: 'rgba(16, 185, 129, 0.06)',
                            border: '1px solid rgba(16, 185, 129, 0.15)',
                            fontSize: '13px',
                            color: '#34D399',
                            fontWeight: 500,
                            marginBottom: '24px',
                        }}
                    >
                        <Package size={14} />
                        Getting Started
                    </motion.span>

                    <h1
                        className="font-display"
                        style={{
                            fontSize: 'clamp(36px, 5vw, 56px)',
                            fontWeight: 700,
                            color: '#F0F0F5',
                            letterSpacing: '-0.03em',
                            marginBottom: '20px',
                        }}
                    >
                        Install <span style={{ background: 'linear-gradient(135deg, #10B981, #06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>native-bits</span>
                    </h1>

                    <p style={{ fontSize: '17px', color: '#6B7280', maxWidth: '500px', margin: '0 auto 40px', lineHeight: 1.7 }}>
                        Copy-paste beautiful React Native components directly into your project. No dependencies, full ownership.
                    </p>

                    {/* Install Command */}
                    <motion.button
                        onClick={handleCopy}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '16px 28px',
                            borderRadius: '16px',
                            background: 'rgba(16, 185, 129, 0.06)',
                            border: '1px solid rgba(16, 185, 129, 0.15)',
                            color: '#34D399',
                            fontSize: '16px',
                            fontWeight: 600,
                            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                        }}
                    >
                        <span style={{ color: '#6B7280' }}>$</span>
                        npx native-bits init
                        {copied ? <Check size={16} color="#10B981" /> : <Copy size={16} color="#6B7280" />}
                    </motion.button>
                </motion.div>

                {/* Prerequisites */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    style={{
                        background: 'linear-gradient(145deg, rgba(17, 17, 24, 0.85), rgba(10, 10, 15, 0.95))',
                        borderRadius: '20px',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        padding: '32px',
                        marginBottom: '64px',
                    }}
                >
                    <h2 className="font-display" style={{ fontSize: '22px', fontWeight: 600, color: '#F0F0F5', marginBottom: '20px' }}>Prerequisites</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                        {[
                            { name: 'React Native', version: '0.72+' },
                            { name: 'react-native-reanimated', version: '3.0+' },
                            { name: 'TypeScript', version: '5.0+' },
                        ].map((dep) => (
                            <div key={dep.name} style={{
                                padding: '16px',
                                borderRadius: '12px',
                                background: 'rgba(0, 0, 0, 0.3)',
                                border: '1px solid rgba(255, 255, 255, 0.04)',
                            }}>
                                <div style={{ fontSize: '14px', fontWeight: 600, color: '#F0F0F5' }}>{dep.name}</div>
                                <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>v{dep.version}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Quick Start */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    style={{ marginBottom: '64px' }}
                >
                    <h2 className="font-display" style={{ fontSize: '28px', fontWeight: 700, color: '#F0F0F5', marginBottom: '24px' }}>
                        Quick Start
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {[
                            { step: '1', title: 'Initialize native-bits', code: 'npx native-bits init' },
                            { step: '2', title: 'Add a component', code: 'npx native-bits add animated-button' },
                            { step: '3', title: 'Use it in your app', code: "import { AnimatedButton } from './components/native-bits/animated-button';\n\n<AnimatedButton title=\"Get Started\" onPress={() => {}} />" },
                        ].map((item) => (
                            <div key={item.step} style={{
                                background: 'linear-gradient(145deg, rgba(17, 17, 24, 0.85), rgba(10, 10, 15, 0.95))',
                                borderRadius: '16px',
                                border: '1px solid rgba(255, 255, 255, 0.05)',
                                padding: '24px',
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                                    <span style={{
                                        width: '28px', height: '28px', borderRadius: '8px',
                                        background: 'linear-gradient(135deg, #10B981, #06B6D4)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '13px', fontWeight: 700, color: '#fff',
                                    }}>
                                        {item.step}
                                    </span>
                                    <span style={{ fontSize: '15px', fontWeight: 600, color: '#F0F0F5' }}>{item.title}</span>
                                </div>
                                <pre style={{
                                    margin: 0,
                                    padding: '14px',
                                    borderRadius: '10px',
                                    background: 'rgba(0, 0, 0, 0.4)',
                                    border: '1px solid rgba(16, 185, 129, 0.08)',
                                    fontSize: '13px',
                                    color: '#9CA3AF',
                                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                                    whiteSpace: 'pre-wrap',
                                    lineHeight: 1.6,
                                    overflowX: 'auto',
                                }}>
                                    <code>{item.code}</code>
                                </pre>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Components Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    style={{ marginBottom: '64px' }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <Boxes size={22} color="#10B981" />
                            <h2 className="font-display" style={{ fontSize: '28px', fontWeight: 700, color: '#F0F0F5' }}>Components</h2>
                        </div>
                        <Link href="/components" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: '#34D399', textDecoration: 'none', fontWeight: 500 }}>
                            View all <ArrowRight size={14} />
                        </Link>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
                        {components.map((item) => (
                            <Link key={item.slug} href={`/docs/components/${item.slug}`} style={{ textDecoration: 'none' }}>
                                <motion.div
                                    whileHover={{ borderColor: 'rgba(16, 185, 129, 0.2)', y: -2 }}
                                    style={{
                                        padding: '20px',
                                        borderRadius: '16px',
                                        background: 'linear-gradient(145deg, rgba(17, 17, 24, 0.85), rgba(10, 10, 15, 0.95))',
                                        border: '1px solid rgba(255, 255, 255, 0.05)',
                                        transition: 'all 0.3s',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <div style={{ fontSize: '15px', fontWeight: 600, color: '#F0F0F5', marginBottom: '6px' }}>{item.name}</div>
                                    <div style={{ fontSize: '13px', color: '#6B7280', lineHeight: 1.5 }}>{item.description}</div>
                                    <div style={{ display: 'flex', gap: '6px', marginTop: '12px', flexWrap: 'wrap' }}>
                                        {item.dependencies.map(dep => (
                                            <span key={dep} style={{
                                                padding: '4px 8px',
                                                borderRadius: '6px',
                                                background: 'rgba(16, 185, 129, 0.06)',
                                                fontSize: '11px',
                                                color: '#34D399',
                                                fontFamily: 'ui-monospace, monospace',
                                            }}>{dep}</span>
                                        ))}
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </motion.div>

                {/* Animations Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    style={{ marginBottom: '100px' }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <Sparkles size={22} color="#06B6D4" />
                            <h2 className="font-display" style={{ fontSize: '28px', fontWeight: 700, color: '#F0F0F5' }}>Animations</h2>
                        </div>
                        <Link href="/animations" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: '#22D3EE', textDecoration: 'none', fontWeight: 500 }}>
                            View all <ArrowRight size={14} />
                        </Link>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
                        {animations.map((item) => (
                            <Link key={item.slug} href={`/docs/animations/${item.slug}`} style={{ textDecoration: 'none' }}>
                                <motion.div
                                    whileHover={{ borderColor: 'rgba(6, 182, 212, 0.2)', y: -2 }}
                                    style={{
                                        padding: '20px',
                                        borderRadius: '16px',
                                        background: 'linear-gradient(145deg, rgba(17, 17, 24, 0.85), rgba(10, 10, 15, 0.95))',
                                        border: '1px solid rgba(255, 255, 255, 0.05)',
                                        transition: 'all 0.3s',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <div style={{ fontSize: '15px', fontWeight: 600, color: '#F0F0F5', marginBottom: '6px' }}>{item.name}</div>
                                    <div style={{ fontSize: '13px', color: '#6B7280', lineHeight: 1.5 }}>{item.description}</div>
                                    <div style={{ display: 'flex', gap: '6px', marginTop: '12px', flexWrap: 'wrap' }}>
                                        {item.dependencies.map(dep => (
                                            <span key={dep} style={{
                                                padding: '4px 8px',
                                                borderRadius: '6px',
                                                background: 'rgba(6, 182, 212, 0.06)',
                                                fontSize: '11px',
                                                color: '#22D3EE',
                                                fontFamily: 'ui-monospace, monospace',
                                            }}>{dep}</span>
                                        ))}
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
