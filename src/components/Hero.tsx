'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { useRef } from 'react';
import Link from 'next/link';
import Orb from './Orb';

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

    return (
        <section
            ref={containerRef}
            className="mesh-gradient"
            style={{
                position: 'relative',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
            }}
        >
            {/* Dot Grid */}
            <div className="dot-grid" style={{
                position: 'absolute',
                inset: 0,
                opacity: 0.5,
                pointerEvents: 'none'
            }} />

            {/* Orb Background */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '1200px',
                height: '1200px',
                zIndex: 0,
            }}>
                <Orb
                    hoverIntensity={2}
                    rotateOnHover
                    hue={0}
                    forceHoverState={false}
                    backgroundColor="#000000"
                />
            </div>

            <motion.div
                style={{
                    maxWidth: '1000px',
                    margin: '0 auto',
                    padding: '120px 20px 80px',
                    position: 'relative',
                    zIndex: 10,
                    textAlign: 'center',
                    opacity,
                    scale,
                    pointerEvents: 'none'
                }}
            >
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <motion.div
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '8px 18px',
                            borderRadius: '100px',
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            marginBottom: '32px',
                            pointerEvents: 'auto'
                        }}
                        whileHover={{
                            borderColor: 'rgba(255, 255, 255, 0.15)',
                            background: 'rgba(255, 255, 255, 0.05)'
                        }}
                    >
                        <motion.span
                            style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                background: '#22C55E'
                            }}
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        <span style={{ fontSize: '13px', color: '#A1A1AA', fontWeight: 500 }}>
                            v2.0 — Now with React Native & Flutter
                        </span>
                    </motion.div>
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        fontSize: 'clamp(42px, 9vw, 82px)',
                        fontWeight: 700,
                        lineHeight: 1.05,
                        marginBottom: '28px',
                        letterSpacing: '-0.04em',
                    }}
                >
                    <span style={{ color: '#FAFAFA' }}>Build beautiful</span>
                    <br />
                    <span className="text-gradient">mobile interfaces</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        fontSize: '18px',
                        color: '#71717A',
                        maxWidth: '560px',
                        margin: '0 auto 48px',
                        lineHeight: 1.8
                    }}
                >
                    An open-source collection of premium animated components
                    for building world-class mobile applications.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: '16px',
                        marginBottom: '80px',
                        pointerEvents: 'auto'
                    }}
                >
                    <motion.button
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px',
                            background: '#FAFAFA',
                            color: '#09090B',
                            padding: '16px 32px',
                            borderRadius: '14px',
                            fontSize: '15px',
                            fontWeight: 600,
                            border: 'none',
                            cursor: 'pointer',
                        }}
                        whileHover={{
                            scale: 1.02,
                            boxShadow: '0 0 50px rgba(255, 255, 255, 0.25)'
                        }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    >
                        Browse Components
                        <ArrowRight style={{ width: '18px', height: '18px' }} />
                    </motion.button>
                    <Link href="/sandbox">
                        <motion.button
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '10px',
                                background: 'rgba(255, 255, 255, 0.03)',
                                color: '#FAFAFA',
                                padding: '16px 32px',
                                borderRadius: '14px',
                                fontSize: '15px',
                                fontWeight: 600,
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                cursor: 'pointer',
                            }}
                            whileHover={{
                                background: 'rgba(255, 255, 255, 0.06)',
                                borderColor: 'rgba(255, 255, 255, 0.2)'
                            }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                        >
                            <Play style={{ width: '16px', height: '16px', fill: 'currentColor' }} />
                            Try Sandbox
                        </motion.button>
                    </Link>
                </motion.div>


            </motion.div>

            {/* Bottom Gradient Line */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60%',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)'
            }} />
        </section>
    );
}
