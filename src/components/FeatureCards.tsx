'use client';

import { motion } from 'framer-motion';
import { Layers, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const cards = [
    {
        title: 'UI Components',
        description: 'Ready-to-use elements for your mobile apps',
        icon: Layers,
        href: '/components',
        gradient: 'linear-gradient(135deg, #667eea, #764ba2)',
        hoverColor: 'rgba(102, 126, 234, 0.4)',
        shadowColor: 'rgba(102, 126, 234, 0.15)',
    },
    {
        title: 'Animations',
        description: 'Stunning motion effects and transitions',
        icon: Sparkles,
        href: '/animations',
        gradient: 'linear-gradient(135deg, #f5576c, #f093fb)',
        hoverColor: 'rgba(245, 87, 108, 0.4)',
        shadowColor: 'rgba(245, 87, 108, 0.15)',
    },
];

export default function FeatureCards() {
    return (
        <section style={{
            padding: '80px 0',
            background: '#09090B',
            position: 'relative',
        }}>
            <div className="dot-grid" style={{
                position: 'absolute',
                inset: 0,
                opacity: 0.3,
            }} />

            <div style={{
                maxWidth: '900px',
                margin: '0 auto',
                padding: '0 24px',
                position: 'relative',
                zIndex: 10,
            }}>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{ textAlign: 'center', marginBottom: '48px' }}
                >
                    <h2 style={{
                        fontSize: 'clamp(28px, 5vw, 42px)',
                        fontWeight: 700,
                        color: '#FAFAFA',
                        marginBottom: '16px',
                        letterSpacing: '-0.03em',
                    }}>
                        Explore Our Library
                    </h2>
                    <p style={{
                        fontSize: '16px',
                        color: '#71717A',
                        maxWidth: '400px',
                        margin: '0 auto',
                    }}>
                        Choose what you need for your next project
                    </p>
                </motion.div>

                {/* Cards Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '24px',
                }}>
                    {cards.map((card, index) => (
                        <motion.div
                            key={card.title}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <Link href={card.href} style={{ textDecoration: 'none' }}>
                                <motion.div
                                    style={{
                                        padding: '32px',
                                        background: 'linear-gradient(145deg, rgba(24, 24, 27, 0.9), rgba(15, 15, 18, 0.95))',
                                        borderRadius: '24px',
                                        border: '1px solid rgba(255, 255, 255, 0.08)',
                                        cursor: 'pointer',
                                        height: '100%',
                                    }}
                                    whileHover={{
                                        scale: 1.02,
                                        borderColor: card.hoverColor,
                                        boxShadow: `0 16px 48px ${card.shadowColor}`,
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                                >
                                    {/* Icon */}
                                    <div style={{
                                        width: '56px',
                                        height: '56px',
                                        borderRadius: '16px',
                                        background: card.gradient,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: '24px',
                                        boxShadow: `0 8px 24px ${card.shadowColor}`,
                                    }}>
                                        <card.icon size={28} color="#FAFAFA" />
                                    </div>

                                    {/* Content */}
                                    <h3 style={{
                                        fontSize: '22px',
                                        fontWeight: 600,
                                        color: '#FAFAFA',
                                        marginBottom: '8px',
                                    }}>
                                        {card.title}
                                    </h3>
                                    <p style={{
                                        fontSize: '14px',
                                        color: '#71717A',
                                        marginBottom: '24px',
                                        lineHeight: 1.6,
                                    }}>
                                        {card.description}
                                    </p>

                                    {/* CTA */}
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        color: '#A1A1AA',
                                        fontSize: '14px',
                                        fontWeight: 500,
                                    }}>
                                        Explore
                                        <ArrowRight size={16} />
                                    </div>
                                </motion.div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
