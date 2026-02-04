'use client';

import { motion } from 'framer-motion';
import { Sparkles, Github, Twitter, Heart } from 'lucide-react';

const footerLinks = {
    Product: ['Components', 'Animations', 'Templates', 'Changelog'],
    Resources: ['Documentation', 'Tutorials', 'Blog', 'Examples'],
    Company: ['About', 'Contact', 'Support'],
    Legal: ['Privacy', 'Terms'],
};

export default function Footer() {
    return (
        <footer style={{
            background: '#060010',
            borderTop: '1px solid rgba(139, 92, 246, 0.1)'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                    gap: '40px',
                    marginBottom: '60px'
                }}>
                    {/* Brand */}
                    <div style={{ gridColumn: 'span 2' }}>
                        <motion.a
                            href="#"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '10px',
                                textDecoration: 'none',
                                marginBottom: '20px'
                            }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '12px',
                                background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 4px 20px rgba(139, 92, 246, 0.3)'
                            }}>
                                <Sparkles style={{ width: '20px', height: '20px', color: 'white' }} />
                            </div>
                            <span style={{
                                fontSize: '20px',
                                fontWeight: 700,
                                background: 'linear-gradient(135deg, #ffffff, #a78bfa)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>MobileUI</span>
                        </motion.a>
                        <p style={{
                            fontSize: '14px',
                            color: '#52525b',
                            maxWidth: '280px',
                            lineHeight: 1.7,
                            marginBottom: '24px'
                        }}>
                            Beautiful, animated UI components for React Native and Flutter developers.
                        </p>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <motion.a
                                href="#"
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '10px',
                                    background: 'rgba(139, 92, 246, 0.1)',
                                    border: '1px solid rgba(139, 92, 246, 0.2)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#a78bfa',
                                    textDecoration: 'none'
                                }}
                                whileHover={{
                                    scale: 1.05,
                                    background: 'rgba(139, 92, 246, 0.2)',
                                    borderColor: 'rgba(139, 92, 246, 0.4)'
                                }}
                            >
                                <Github style={{ width: '18px', height: '18px' }} />
                            </motion.a>
                            <motion.a
                                href="#"
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '10px',
                                    background: 'rgba(139, 92, 246, 0.1)',
                                    border: '1px solid rgba(139, 92, 246, 0.2)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#a78bfa',
                                    textDecoration: 'none'
                                }}
                                whileHover={{
                                    scale: 1.05,
                                    background: 'rgba(139, 92, 246, 0.2)',
                                    borderColor: 'rgba(139, 92, 246, 0.4)'
                                }}
                            >
                                <Twitter style={{ width: '18px', height: '18px' }} />
                            </motion.a>
                        </div>
                    </div>

                    {/* Links */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h4 style={{
                                fontSize: '13px',
                                fontWeight: 600,
                                color: '#ffffff',
                                marginBottom: '16px',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em'
                            }}>{category}</h4>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                {links.map((link) => (
                                    <li key={link} style={{ marginBottom: '10px' }}>
                                        <a
                                            href="#"
                                            style={{
                                                fontSize: '14px',
                                                color: '#52525b',
                                                textDecoration: 'none',
                                                transition: 'color 0.2s'
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.color = '#a78bfa'}
                                            onMouseLeave={(e) => e.currentTarget.style.color = '#52525b'}
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom */}
                <div style={{
                    paddingTop: '32px',
                    borderTop: '1px solid rgba(139, 92, 246, 0.1)',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px'
                }}>
                    <p style={{
                        fontSize: '13px',
                        color: '#3f3f46',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                    }}>
                        Made with <Heart style={{ width: '14px', height: '14px', color: '#ec4899' }} /> by MobileUI Pro
                    </p>
                    <p style={{ fontSize: '13px', color: '#3f3f46' }}>
                        © 2024 MobileUI Pro. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
