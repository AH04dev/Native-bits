'use client';

import { motion } from 'framer-motion';
import { Copy, Check, ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getRegistryItem } from '@/registry';

export default function AnimationDocPage() {
    const params = useParams();
    const slug = params.slug as string;
    const item = getRegistryItem(slug);
    const [code, setCode] = useState('');
    const [copied, setCopied] = useState(false);
    const [copiedInstall, setCopiedInstall] = useState(false);

    useEffect(() => {
        if (item) {
            fetch(`/api/registry/${item.file}`)
                .then(r => r.text())
                .then(setCode)
                .catch(() => setCode('// Source code could not be loaded'));
        }
    }, [item]);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleCopyInstall = () => {
        navigator.clipboard.writeText(`npx native-bits add ${slug}`);
        setCopiedInstall(true);
        setTimeout(() => setCopiedInstall(false), 2000);
    };

    if (!item) {
        return (
            <div style={{ minHeight: '100vh', background: '#050505', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                    <h1 style={{ color: '#F0F0F5', fontSize: '24px', marginBottom: '12px' }}>Animation not found</h1>
                    <Link href="/docs" style={{ color: '#22D3EE', textDecoration: 'none' }}>← Back to docs</Link>
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: '#050505', paddingTop: '100px' }}>
            <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px' }}>

                {/* Back Link */}
                <Link href="/docs" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#6B7280', textDecoration: 'none', fontSize: '14px', marginBottom: '32px' }}>
                    <ArrowLeft size={14} /> Back to docs
                </Link>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ marginBottom: '40px' }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                        <span style={{
                            padding: '6px 12px',
                            borderRadius: '8px',
                            background: 'rgba(6, 182, 212, 0.06)',
                            border: '1px solid rgba(6, 182, 212, 0.15)',
                            fontSize: '12px',
                            color: '#22D3EE',
                            fontWeight: 500,
                        }}>
                            Animation
                        </span>
                    </div>
                    <h1 className="font-display" style={{ fontSize: '40px', fontWeight: 700, color: '#F0F0F5', letterSpacing: '-0.02em', marginBottom: '12px' }}>
                        {item.name}
                    </h1>
                    <p style={{ fontSize: '17px', color: '#6B7280', lineHeight: 1.7, maxWidth: '600px' }}>
                        {item.description}
                    </p>
                </motion.div>

                {/* Install Command */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    style={{ marginBottom: '40px' }}
                >
                    <h2 className="font-display" style={{ fontSize: '18px', fontWeight: 600, color: '#F0F0F5', marginBottom: '12px' }}>Installation</h2>
                    <motion.button
                        onClick={handleCopyInstall}
                        whileTap={{ scale: 0.98 }}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '14px 20px',
                            borderRadius: '12px',
                            background: 'rgba(0, 0, 0, 0.4)',
                            border: '1px solid rgba(6, 182, 212, 0.1)',
                            color: '#9CA3AF',
                            fontSize: '14px',
                            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                            cursor: 'pointer',
                            width: '100%',
                            justifyContent: 'space-between',
                        }}
                    >
                        <span><span style={{ color: '#6B7280' }}>$</span> npx native-bits add {slug}</span>
                        {copiedInstall ? <Check size={14} color="#06B6D4" /> : <Copy size={14} color="#6B7280" />}
                    </motion.button>

                    {item.dependencies.length > 0 && (
                        <div style={{ marginTop: '12px' }}>
                            <span style={{ fontSize: '12px', color: '#6B7280' }}>Requires: </span>
                            {item.dependencies.map(dep => (
                                <span key={dep} style={{
                                    padding: '3px 8px',
                                    borderRadius: '6px',
                                    background: 'rgba(6, 182, 212, 0.06)',
                                    fontSize: '11px',
                                    color: '#22D3EE',
                                    fontFamily: 'ui-monospace, monospace',
                                    marginLeft: '6px',
                                }}>{dep}</span>
                            ))}
                        </div>
                    )}
                </motion.div>

                {/* Props Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    style={{ marginBottom: '40px' }}
                >
                    <h2 className="font-display" style={{ fontSize: '18px', fontWeight: 600, color: '#F0F0F5', marginBottom: '16px' }}>Props</h2>
                    <div style={{
                        borderRadius: '16px',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        overflow: 'hidden',
                    }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ background: 'rgba(255, 255, 255, 0.02)' }}>
                                    {['Prop', 'Type', 'Default', 'Description'].map(h => (
                                        <th key={h} style={{
                                            padding: '12px 16px',
                                            textAlign: 'left',
                                            fontSize: '12px',
                                            fontWeight: 600,
                                            color: '#6B7280',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.05em',
                                            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                                        }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {item.props.map((prop, i) => (
                                    <tr key={prop.name} style={{ background: i % 2 === 0 ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.1)' }}>
                                        <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: 600, color: '#F0F0F5', fontFamily: 'ui-monospace, monospace' }}>{prop.name}</td>
                                        <td style={{ padding: '12px 16px', fontSize: '12px', color: '#06B6D4', fontFamily: 'ui-monospace, monospace' }}>{prop.type}</td>
                                        <td style={{ padding: '12px 16px', fontSize: '12px', color: '#9CA3AF', fontFamily: 'ui-monospace, monospace' }}>{prop.default || '—'}</td>
                                        <td style={{ padding: '12px 16px', fontSize: '13px', color: '#9CA3AF' }}>{prop.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* Source Code */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    style={{ marginBottom: '100px' }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                        <h2 className="font-display" style={{ fontSize: '18px', fontWeight: 600, color: '#F0F0F5' }}>Source Code</h2>
                        <motion.button
                            onClick={handleCopy}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '8px 14px',
                                borderRadius: '8px',
                                background: copied ? 'rgba(6, 182, 212, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                                border: 'none',
                                color: copied ? '#06B6D4' : '#9CA3AF',
                                fontSize: '13px',
                                fontWeight: 500,
                                cursor: 'pointer',
                            }}
                        >
                            {copied ? <Check size={14} /> : <Copy size={14} />}
                            {copied ? 'Copied!' : 'Copy code'}
                        </motion.button>
                    </div>
                    <div style={{
                        borderRadius: '16px',
                        border: '1px solid rgba(6, 182, 212, 0.08)',
                        background: 'rgba(0, 0, 0, 0.4)',
                        overflow: 'hidden',
                    }}>
                        <pre style={{
                            margin: 0,
                            padding: '20px',
                            fontSize: '12px',
                            color: '#9CA3AF',
                            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                            whiteSpace: 'pre-wrap',
                            lineHeight: 1.7,
                            maxHeight: '600px',
                            overflowY: 'auto',
                        }}>
                            <code>{code || 'Loading...'}</code>
                        </pre>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
