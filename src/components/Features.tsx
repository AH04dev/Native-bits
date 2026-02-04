'use client';

import { motion } from 'framer-motion';
import {
    Layers,
    Zap,
    Palette,
    Gauge,
    Smartphone,
    Code2
} from 'lucide-react';

const features = [
    {
        icon: Layers,
        title: '100+ Components',
        description: 'Beautifully crafted UI components ready for production.',
        color: '#8b5cf6'
    },
    {
        icon: Zap,
        title: '50+ Animations',
        description: 'Smooth micro-interactions and stunning transitions.',
        color: '#22d3ee'
    },
    {
        icon: Palette,
        title: 'Customizable',
        description: 'Easy to customize colors, sizes, and behaviors.',
        color: '#ec4899'
    },
    {
        icon: Gauge,
        title: '60fps Performance',
        description: 'Optimized for smooth, native-like experience.',
        color: '#f59e0b'
    },
    {
        icon: Smartphone,
        title: 'Cross Platform',
        description: 'Works on React Native & Flutter seamlessly.',
        color: '#10b981'
    },
    {
        icon: Code2,
        title: 'TypeScript',
        description: 'Full type safety and amazing DX.',
        color: '#6366f1'
    }
];

export default function Features() {
    return (
        <section
            id="features"
            style={{
                padding: '100px 0',
                position: 'relative',
                background: '#060010'
            }}
        >
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: 'center', marginBottom: '60px' }}
                >
                    <span style={{
                        display: 'inline-block',
                        padding: '6px 14px',
                        borderRadius: '100px',
                        background: 'rgba(236, 72, 153, 0.1)',
                        border: '1px solid rgba(236, 72, 153, 0.3)',
                        fontSize: '12px',
                        color: '#ec4899',
                        fontWeight: 500,
                        marginBottom: '20px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em'
                    }}>
                        Features
                    </span>
                    <h2 style={{
                        fontSize: 'clamp(32px, 5vw, 48px)',
                        fontWeight: 700,
                        marginBottom: '16px',
                        background: 'linear-gradient(135deg, #ffffff, #a1a1aa)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        Everything You Need
                    </h2>
                    <p style={{
                        fontSize: '16px',
                        color: '#71717a',
                        maxWidth: '500px',
                        margin: '0 auto'
                    }}>
                        A complete toolkit for building world-class mobile applications.
                    </p>
                </motion.div>

                {/* Features Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '20px'
                }}>
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                            whileHover={{
                                y: -6,
                                borderColor: `${feature.color}40`,
                                boxShadow: `0 20px 40px ${feature.color}15`
                            }}
                            style={{
                                padding: '28px',
                                borderRadius: '20px',
                                background: 'rgba(13, 13, 26, 0.6)',
                                border: '1px solid rgba(139, 92, 246, 0.1)',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '14px',
                                background: `${feature.color}15`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '20px'
                            }}>
                                <feature.icon style={{ width: '24px', height: '24px', color: feature.color }} />
                            </div>
                            <h3 style={{
                                fontSize: '18px',
                                fontWeight: 600,
                                color: 'white',
                                marginBottom: '8px'
                            }}>{feature.title}</h3>
                            <p style={{
                                fontSize: '14px',
                                color: '#71717a',
                                lineHeight: 1.6
                            }}>{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
