'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Mail, Sparkles } from 'lucide-react';

export default function CTA() {
    return (
        <section
            style={{
                padding: '120px 0',
                position: 'relative',
                background: '#060010'
            }}
        >
            {/* Gradient Orbs */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '800px',
                height: '800px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 60%)',
                filter: 'blur(60px)',
                pointerEvents: 'none'
            }} />

            <div style={{ maxWidth: '700px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 10 }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: 'center' }}
                >
                    {/* Icon */}
                    <motion.div
                        style={{
                            width: '64px',
                            height: '64px',
                            borderRadius: '20px',
                            background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 32px',
                            boxShadow: '0 8px 40px rgba(139, 92, 246, 0.4)'
                        }}
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <Sparkles style={{ width: '32px', height: '32px', color: 'white' }} />
                    </motion.div>

                    {/* Heading */}
                    <h2 style={{
                        fontSize: 'clamp(32px, 6vw, 56px)',
                        fontWeight: 700,
                        marginBottom: '20px',
                        lineHeight: 1.1
                    }}>
                        Ready to build
                        <br />
                        <span style={{
                            background: 'linear-gradient(135deg, #8b5cf6, #22d3ee)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>amazing apps?</span>
                    </h2>
                    <p style={{
                        fontSize: '17px',
                        color: '#71717a',
                        marginBottom: '40px',
                        lineHeight: 1.7
                    }}>
                        Join 10,000+ developers who are building stunning mobile apps with MobileUI Pro.
                    </p>

                    {/* CTA Buttons */}
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: '16px',
                        marginBottom: '60px'
                    }}>
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
                            Get Started Free
                            <ArrowRight size={18} />
                        </motion.button>
                        <motion.button
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                background: 'rgba(139, 92, 246, 0.1)',
                                color: 'white',
                                padding: '16px 32px',
                                borderRadius: '14px',
                                fontSize: '15px',
                                fontWeight: 600,
                                border: '1px solid rgba(139, 92, 246, 0.3)',
                                cursor: 'pointer'
                            }}
                            whileHover={{ background: 'rgba(139, 92, 246, 0.2)', borderColor: 'rgba(139, 92, 246, 0.5)' }}
                            whileTap={{ scale: 0.98 }}
                        >
                            View Documentation
                        </motion.button>
                    </div>

                    {/* Email Signup */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <p style={{ fontSize: '14px', color: '#52525b', marginBottom: '16px' }}>
                            Or subscribe for updates and new components
                        </p>
                        <form style={{
                            display: 'flex',
                            gap: '12px',
                            maxWidth: '400px',
                            margin: '0 auto'
                        }}>
                            <div style={{ flex: 1, position: 'relative' }}>
                                <Mail style={{
                                    position: 'absolute',
                                    left: '16px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    width: '18px',
                                    height: '18px',
                                    color: '#52525b'
                                }} />
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    style={{
                                        width: '100%',
                                        background: 'rgba(13, 13, 26, 0.8)',
                                        border: '1px solid rgba(139, 92, 246, 0.2)',
                                        borderRadius: '12px',
                                        padding: '14px 16px 14px 48px',
                                        color: 'white',
                                        fontSize: '14px',
                                        outline: 'none'
                                    }}
                                />
                            </div>
                            <motion.button
                                type="submit"
                                style={{
                                    padding: '14px 24px',
                                    background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                                    color: 'white',
                                    borderRadius: '12px',
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    border: 'none',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 20px rgba(139, 92, 246, 0.3)'
                                }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Subscribe
                            </motion.button>
                        </form>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
