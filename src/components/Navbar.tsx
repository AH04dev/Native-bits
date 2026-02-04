'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, Github, Star } from 'lucide-react';

const navLinks = [
    { name: 'Components', href: '#components' },
    { name: 'Animations', href: '#animations' },
    { name: 'Sandbox', href: '/sandbox' },
    { name: 'Pricing', href: '#pricing' },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                padding: '16px 0',
                background: isScrolled ? 'rgba(6, 0, 16, 0.9)' : 'transparent',
                backdropFilter: isScrolled ? 'blur(20px)' : 'none',
                borderBottom: isScrolled ? '1px solid rgba(139, 92, 246, 0.1)' : 'none',
                transition: 'all 0.3s ease',
            }}
        >
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '0 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                {/* Logo */}
                <motion.a
                    href="#"
                    style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
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
                        boxShadow: '0 4px 20px rgba(139, 92, 246, 0.4)'
                    }}>
                        <Sparkles style={{ width: '20px', height: '20px', color: 'white' }} />
                    </div>
                    <span style={{
                        fontSize: '22px',
                        fontWeight: 700,
                        background: 'linear-gradient(135deg, #ffffff, #a78bfa)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>MobileUI</span>
                </motion.a>

                {/* Desktop Nav */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }} className="hidden md:flex">
                    {navLinks.map((link) => (
                        <motion.a
                            key={link.name}
                            href={link.href}
                            style={{
                                color: '#a1a1aa',
                                textDecoration: 'none',
                                fontSize: '14px',
                                fontWeight: 500,
                                transition: 'color 0.2s'
                            }}
                            whileHover={{ color: '#ffffff' }}
                        >
                            {link.name}
                        </motion.a>
                    ))}
                </div>

                {/* CTA */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }} className="hidden md:flex">
                    <motion.a
                        href="#"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            color: '#a1a1aa',
                            textDecoration: 'none',
                            fontSize: '14px',
                            padding: '10px 16px',
                            borderRadius: '10px',
                            border: '1px solid rgba(139, 92, 246, 0.3)',
                            transition: 'all 0.2s'
                        }}
                        whileHover={{
                            color: '#ffffff',
                            borderColor: 'rgba(139, 92, 246, 0.6)',
                            background: 'rgba(139, 92, 246, 0.1)'
                        }}
                    >
                        <Github style={{ width: '16px', height: '16px' }} />
                        <Star style={{ width: '14px', height: '14px' }} />
                        <span>2.5k</span>
                    </motion.a>
                    <motion.button
                        style={{
                            background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                            color: 'white',
                            padding: '10px 20px',
                            borderRadius: '10px',
                            fontSize: '14px',
                            fontWeight: 600,
                            border: 'none',
                            cursor: 'pointer',
                            boxShadow: '0 4px 20px rgba(139, 92, 246, 0.4)'
                        }}
                        whileHover={{ scale: 1.02, boxShadow: '0 6px 30px rgba(139, 92, 246, 0.5)' }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Get Started
                    </motion.button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    style={{
                        display: 'none',
                        color: 'white',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '8px'
                    }}
                    className="md:hidden flex"
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        style={{
                            position: 'absolute',
                            top: '100%',
                            left: '16px',
                            right: '16px',
                            background: 'rgba(13, 13, 26, 0.95)',
                            backdropFilter: 'blur(20px)',
                            borderRadius: '16px',
                            border: '1px solid rgba(139, 92, 246, 0.2)',
                            padding: '24px',
                            marginTop: '8px'
                        }}
                        className="md:hidden"
                    >
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                style={{
                                    display: 'block',
                                    color: '#a1a1aa',
                                    textDecoration: 'none',
                                    padding: '12px 0',
                                    fontSize: '16px',
                                    borderBottom: '1px solid rgba(139, 92, 246, 0.1)'
                                }}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </a>
                        ))}
                        <button
                            style={{
                                width: '100%',
                                marginTop: '16px',
                                background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                                color: 'white',
                                padding: '14px',
                                borderRadius: '12px',
                                fontSize: '14px',
                                fontWeight: 600,
                                border: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            Get Started
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
