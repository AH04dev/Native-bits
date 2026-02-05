'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Star, ArrowUpRight, Zap, Heart } from 'lucide-react';

const navLinks = [
    { name: 'Components', href: '/components' },
    { name: 'Animations', href: '/animations' },
    { name: 'Sandbox', href: '/sandbox' },
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
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                pointerEvents: 'none', // Allow clicks to pass through around the navbar
                display: 'flex',
                justifyContent: 'center',
                paddingTop: '24px',
            }}
        >
            <motion.div
                style={{
                    pointerEvents: 'auto', // Re-enable clicks for the navbar itself
                    width: 'calc(100% - 32px)',
                    maxWidth: '1000px',
                    padding: '8px 8px 8px 24px',
                    background: 'rgba(9, 9, 11, 0.6)',
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '100px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: '0 8px 32px -8px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(0,0,0,0.2)',
                }}
            >
                {/* Logo */}
                <motion.a
                    href="/"
                    style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <div style={{
                        position: 'relative',
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            borderRadius: '10px',
                            background: 'linear-gradient(135deg, #667eea, #764ba2)',
                            opacity: 0.2
                        }} />
                        <Zap size={18} color="#FAFAFA" fill="currentColor" />
                    </div>
                    <span style={{
                        fontSize: '18px',
                        fontWeight: 700,
                        color: '#FAFAFA',
                        letterSpacing: '-0.02em',
                        fontFeatureSettings: '"ss01" 1'
                    }}>Native Bits</span>
                </motion.a>

                {/* Desktop Nav */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '2px', background: 'rgba(255,255,255,0.03)', padding: '4px', borderRadius: '100px' }} className="hidden md:flex">
                    {navLinks.map((link) => (
                        <motion.a
                            key={link.name}
                            href={link.href}
                            style={{
                                color: '#A1A1AA',
                                textDecoration: 'none',
                                fontSize: '13px',
                                fontWeight: 500,
                                padding: '8px 16px',
                                borderRadius: '100px',
                                transition: 'all 0.2s',
                                position: 'relative'
                            }}
                            whileHover={{
                                color: '#FAFAFA',
                                background: 'rgba(255, 255, 255, 0.08)'
                            }}
                        >
                            {link.name}
                        </motion.a>
                    ))}
                </div>

                {/* Right Side: GitHub + Sponsor + CTA */}
                <div style={{ alignItems: 'center', gap: '12px' }} className="hidden md:flex">
                    <motion.a
                        href="#"
                        style={{
                            color: '#A1A1AA',
                            padding: '10px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'color 0.2s'
                        }}
                        whileHover={{ color: '#FAFAFA', background: 'rgba(255,255,255,0.05)' }}
                    >
                        <Github size={20} />
                    </motion.a>

                    <motion.button
                        style={{
                            background: 'rgba(236, 72, 153, 0.1)',
                            color: '#F472B6',
                            padding: '10px 20px',
                            borderRadius: '100px',
                            fontSize: '13px',
                            fontWeight: 600,
                            border: '1px solid rgba(236, 72, 153, 0.2)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                        }}
                        whileHover={{
                            scale: 1.05,
                            background: 'rgba(236, 72, 153, 0.2)',
                            boxShadow: '0 0 20px rgba(236, 72, 153, 0.2)'
                        }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Heart size={14} fill="currentColor" />
                        Sponsor
                    </motion.button>

                    <motion.button
                        style={{
                            background: '#FAFAFA',
                            color: '#09090B',
                            padding: '10px 20px',
                            borderRadius: '100px',
                            fontSize: '13px',
                            fontWeight: 600,
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                        }}
                        whileHover={{
                            scale: 1.05,
                            boxShadow: '0 0 20px rgba(255, 255, 255, 0.3)'
                        }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                    >
                        Get Access
                        <ArrowUpRight size={14} />
                    </motion.button>
                </div>

                {/* Mobile Menu Button */}
                <motion.button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: isMobileMenuOpen ? 'rgba(255,255,255,0.1)' : 'transparent',
                        border: 'none',
                        color: '#FAFAFA',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                    }}
                    className="flex md:hidden"
                    whileTap={{ scale: 0.9 }}
                >
                    {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </motion.button>
            </motion.div>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        style={{
                            position: 'absolute',
                            top: '80px',
                            left: '16px',
                            right: '16px',
                            padding: '20px',
                            background: 'rgba(20, 20, 22, 0.95)',
                            backdropFilter: 'blur(30px)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '24px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px',
                            zIndex: 99,
                            pointerEvents: 'auto',
                            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
                        }}
                        className="md:hidden"
                    >
                        {navLinks.map((link, i) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                style={{
                                    padding: '16px',
                                    borderRadius: '16px',
                                    background: 'rgba(255,255,255,0.03)',
                                    color: '#A1A1AA',
                                    textDecoration: 'none',
                                    fontSize: '15px',
                                    fontWeight: 500,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                                <ArrowUpRight size={14} style={{ opacity: 0.5 }} />
                            </motion.a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
