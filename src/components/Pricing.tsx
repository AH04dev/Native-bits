'use client';

import { motion } from 'framer-motion';
import { Check, ArrowRight, Sparkles } from 'lucide-react';

const plans = [
    {
        name: 'Free',
        price: '$0',
        period: 'forever',
        description: 'Perfect for side projects',
        features: ['20+ Core Components', '10 Basic Animations', 'React Native Support', 'Community Support'],
        color: '#71717a',
        popular: false,
    },
    {
        name: 'Pro',
        price: '$49',
        period: 'one-time',
        description: 'Everything for professionals',
        features: ['100+ Premium Components', '50+ Smooth Animations', 'React Native + Flutter', 'TypeScript Definitions', 'Priority Support', 'Lifetime Updates'],
        color: '#8b5cf6',
        popular: true,
    },
    {
        name: 'Enterprise',
        price: '$199',
        period: 'per seat/year',
        description: 'For teams and organizations',
        features: ['Everything in Pro', 'Custom Branding', 'Private Slack', 'Custom Components', 'SLA Guarantee'],
        color: '#22d3ee',
        popular: false,
    },
];

export default function Pricing() {
    return (
        <section
            id="pricing"
            style={{
                padding: '100px 0',
                position: 'relative',
                background: 'linear-gradient(180deg, #0a0a1a 0%, #060010 100%)'
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

            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
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
                        background: 'rgba(245, 158, 11, 0.1)',
                        border: '1px solid rgba(245, 158, 11, 0.3)',
                        fontSize: '12px',
                        color: '#f59e0b',
                        fontWeight: 500,
                        marginBottom: '20px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em'
                    }}>
                        Pricing
                    </span>
                    <h2 style={{
                        fontSize: 'clamp(32px, 5vw, 48px)',
                        fontWeight: 700,
                        marginBottom: '16px',
                        background: 'linear-gradient(135deg, #ffffff, #a1a1aa)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        Simple, Transparent Pricing
                    </h2>
                    <p style={{
                        fontSize: '16px',
                        color: '#71717a',
                        maxWidth: '500px',
                        margin: '0 auto'
                    }}>
                        No subscriptions, no hidden fees. Pay once, use forever.
                    </p>
                </motion.div>

                {/* Pricing Cards */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '24px',
                    alignItems: 'stretch'
                }}>
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                            whileHover={{
                                y: -8,
                                borderColor: `${plan.color}50`,
                                boxShadow: plan.popular ? `0 30px 60px ${plan.color}25` : 'none'
                            }}
                            style={{
                                position: 'relative',
                                padding: '32px',
                                borderRadius: '24px',
                                background: plan.popular
                                    ? 'linear-gradient(180deg, rgba(139, 92, 246, 0.15) 0%, rgba(13, 13, 26, 0.8) 100%)'
                                    : 'rgba(13, 13, 26, 0.6)',
                                border: `1px solid ${plan.color}30`,
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {/* Popular Badge */}
                            {plan.popular && (
                                <div style={{
                                    position: 'absolute',
                                    top: '-12px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                                    padding: '6px 16px',
                                    borderRadius: '100px',
                                    fontSize: '12px',
                                    fontWeight: 600,
                                    color: 'white',
                                    boxShadow: '0 4px 20px rgba(139, 92, 246, 0.4)'
                                }}>
                                    <Sparkles size={12} />
                                    Most Popular
                                </div>
                            )}

                            {/* Plan Info */}
                            <div style={{ marginBottom: '24px' }}>
                                <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'white', marginBottom: '4px' }}>{plan.name}</h3>
                                <p style={{ fontSize: '14px', color: '#71717a' }}>{plan.description}</p>
                            </div>

                            {/* Price */}
                            <div style={{ marginBottom: '28px' }}>
                                <span style={{ fontSize: '48px', fontWeight: 700, color: 'white' }}>{plan.price}</span>
                                <span style={{ fontSize: '14px', color: '#71717a', marginLeft: '8px' }}>/{plan.period}</span>
                            </div>

                            {/* Features */}
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, marginBottom: '28px' }}>
                                {plan.features.map((feature) => (
                                    <li
                                        key={feature}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                            marginBottom: '14px'
                                        }}
                                    >
                                        <div style={{
                                            width: '20px',
                                            height: '20px',
                                            borderRadius: '50%',
                                            background: `${plan.color}20`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0
                                        }}>
                                            <Check style={{ width: '12px', height: '12px', color: plan.color }} />
                                        </div>
                                        <span style={{ fontSize: '14px', color: '#a1a1aa' }}>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA Button */}
                            <motion.button
                                style={{
                                    width: '100%',
                                    padding: '14px',
                                    borderRadius: '12px',
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    background: plan.popular
                                        ? 'linear-gradient(135deg, #8b5cf6, #7c3aed)'
                                        : 'rgba(139, 92, 246, 0.1)',
                                    color: 'white',
                                    boxShadow: plan.popular ? '0 4px 20px rgba(139, 92, 246, 0.4)' : 'none'
                                }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Get Started
                                <ArrowRight size={16} />
                            </motion.button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
