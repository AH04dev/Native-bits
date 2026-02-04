'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play, Sparkles, Code2 } from 'lucide-react';
import { useRef } from 'react';
import Link from 'next/link';

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section
            ref={containerRef}
            style={{
                position: 'relative',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                background: '#060010'
            }}
        >
            {/* Animated Grid Background */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'linear-gradient(rgba(139, 92, 246, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.03) 1px, transparent 1px)',
                backgroundSize: '60px 60px'
            }} />

            {/* Gradient Orbs */}
            <motion.div
                style={{
                    position: 'absolute',
                    top: '20%',
                    left: '10%',
                    width: '600px',
                    height: '600px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                    y
                }}
            />
            <motion.div
                style={{
                    position: 'absolute',
                    bottom: '10%',
                    right: '10%',
                    width: '500px',
                    height: '500px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(34, 211, 238, 0.1) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                    y
                }}
            />

            <motion.div
                style={{
                    maxWidth: '1000px',
                    margin: '0 auto',
                    padding: '120px 24px 80px',
                    position: 'relative',
                    zIndex: 10,
                    textAlign: 'center',
                    opacity
                }}
            >
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '8px 16px',
                        borderRadius: '100px',
                        background: 'rgba(139, 92, 246, 0.1)',
                        border: '1px solid rgba(139, 92, 246, 0.3)',
                        marginBottom: '32px'
                    }}>
                        <Sparkles style={{ width: '14px', height: '14px', color: '#a78bfa' }} />
                        <span style={{ fontSize: '13px', color: '#a78bfa', fontWeight: 500 }}>
                            Now with React Native & Flutter support
                        </span>
                    </div>
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    style={{
                        fontSize: 'clamp(40px, 8vw, 80px)',
                        fontWeight: 800,
                        lineHeight: 1.1,
                        marginBottom: '24px',
                        letterSpacing: '-0.02em'
                    }}
                >
                    Animated UI Components
                    <br />
                    <span style={{
                        background: 'linear-gradient(135deg, #8b5cf6 0%, #22d3ee 50%, #ec4899 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                    }}>For Mobile Apps</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    style={{
                        fontSize: '18px',
                        color: '#a1a1aa',
                        maxWidth: '600px',
                        margin: '0 auto 40px',
                        lineHeight: 1.7
                    }}
                >
                    An open source collection of high quality, animated, interactive & fully
                    customizable components for building stunning mobile user interfaces.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: '16px',
                        marginBottom: '80px'
                    }}
                >
                    <motion.button
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                            color: 'white',
                            padding: '16px 32px',
                            borderRadius: '14px',
                            fontSize: '15px',
                            fontWeight: 600,
                            border: 'none',
                            cursor: 'pointer',
                            boxShadow: '0 4px 30px rgba(139, 92, 246, 0.4)'
                        }}
                        whileHover={{ scale: 1.02, boxShadow: '0 8px 40px rgba(139, 92, 246, 0.5)' }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Browse Components
                        <ArrowRight style={{ width: '18px', height: '18px' }} />
                    </motion.button>
                    <Link href="/sandbox">
                        <motion.button
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                background: 'rgba(34, 211, 238, 0.1)',
                                color: 'white',
                                padding: '16px 32px',
                                borderRadius: '14px',
                                fontSize: '15px',
                                fontWeight: 600,
                                border: '1px solid rgba(34, 211, 238, 0.3)',
                                cursor: 'pointer'
                            }}
                            whileHover={{ background: 'rgba(34, 211, 238, 0.2)', borderColor: 'rgba(34, 211, 238, 0.5)' }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Code2 style={{ width: '18px', height: '18px' }} />
                            Try Sandbox
                        </motion.button>
                    </Link>
                </motion.div>

                {/* Floating Preview Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '16px',
                        maxWidth: '800px',
                        margin: '0 auto'
                    }}
                >
                    {[
                        { label: 'Buttons', color: '#8b5cf6' },
                        { label: 'Cards', color: '#22d3ee' },
                        { label: 'Animations', color: '#ec4899' }
                    ].map((item, i) => (
                        <motion.div
                            key={item.label}
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut' }}
                            style={{
                                padding: '24px',
                                borderRadius: '16px',
                                background: 'rgba(13, 13, 26, 0.8)',
                                border: `1px solid ${item.color}30`,
                                backdropFilter: 'blur(10px)'
                            }}
                        >
                            <div style={{
                                width: '100%',
                                height: '80px',
                                borderRadius: '12px',
                                background: `linear-gradient(135deg, ${item.color}20, ${item.color}05)`,
                                marginBottom: '12px'
                            }} />
                            <span style={{ fontSize: '14px', color: '#a1a1aa' }}>{item.label}</span>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
}
