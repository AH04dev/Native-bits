'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, ChevronRight } from 'lucide-react';
import { useState } from 'react';

type Platform = 'react-native' | 'flutter';

interface Component {
    name: string;
    category: string;
    color: string;
    preview: React.ReactNode;
    code: {
        'react-native': string;
        flutter: string;
    };
}

const components: Component[] = [
    {
        name: 'Animated Button',
        category: 'Buttons',
        color: '#8b5cf6',
        preview: (
            <motion.button
                style={{
                    padding: '14px 28px',
                    background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                    color: 'white',
                    borderRadius: '12px',
                    border: 'none',
                    fontWeight: 600,
                    fontSize: '14px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 20px rgba(139, 92, 246, 0.4)'
                }}
                whileHover={{ scale: 1.05, boxShadow: '0 8px 30px rgba(139, 92, 246, 0.5)' }}
                whileTap={{ scale: 0.95 }}
            >
                Click me
            </motion.button>
        ),
        code: {
            'react-native': `import { AnimatedButton } from 'mobileui-pro';

<AnimatedButton
  title="Click me"
  variant="primary"
  onPress={() => console.log('Pressed!')}
  style={{ paddingHorizontal: 28, paddingVertical: 14 }}
/>`,
            flutter: `import 'package:mobileui_pro/mobileui_pro.dart';

AnimatedButton(
  text: 'Click me',
  variant: ButtonVariant.primary,
  onPressed: () => print('Pressed!'),
  padding: EdgeInsets.symmetric(horizontal: 28, vertical: 14),
)`
        }
    },
    {
        name: 'Gradient Card',
        category: 'Cards',
        color: '#22d3ee',
        preview: (
            <motion.div
                style={{
                    width: '160px',
                    padding: '20px',
                    background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.15), rgba(34, 211, 238, 0.05))',
                    borderRadius: '16px',
                    border: '1px solid rgba(34, 211, 238, 0.3)'
                }}
                whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(34, 211, 238, 0.2)' }}
            >
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#22d3ee', marginBottom: '12px' }} />
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'white', marginBottom: '4px' }}>Card Title</div>
                <div style={{ fontSize: '12px', color: '#71717a' }}>Description text</div>
            </motion.div>
        ),
        code: {
            'react-native': `import { GradientCard } from 'mobileui-pro';

<GradientCard
  gradient={['#22d3ee', '#06b6d4']}
  title="Card Title"
  description="Description text"
  icon={<Icon name="star" />}
  onPress={() => navigate('Details')}
/>`,
            flutter: `import 'package:mobileui_pro/mobileui_pro.dart';

GradientCard(
  gradient: [Color(0xFF22d3ee), Color(0xFF06b6d4)],
  title: 'Card Title',
  description: 'Description text',
  icon: Icon(Icons.star),
  onTap: () => Navigator.pushNamed(context, '/details'),
)`
        }
    },
    {
        name: 'Pulse Loader',
        category: 'Loaders',
        color: '#ec4899',
        preview: (
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        style={{
                            width: '14px',
                            height: '14px',
                            borderRadius: '50%',
                            background: '#ec4899'
                        }}
                        animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    />
                ))}
            </div>
        ),
        code: {
            'react-native': `import { PulseLoader } from 'mobileui-pro';

<PulseLoader
  color="#ec4899"
  size={14}
  count={3}
  spacing={8}
/>`,
            flutter: `import 'package:mobileui_pro/mobileui_pro.dart';

PulseLoader(
  color: Color(0xFFec4899),
  size: 14,
  count: 3,
  spacing: 8,
)`
        }
    },
    {
        name: 'Gradient Input',
        category: 'Forms',
        color: '#f59e0b',
        preview: (
            <div style={{
                padding: '2px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
                width: '180px'
            }}>
                <input
                    type="text"
                    placeholder="Type here..."
                    style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        border: 'none',
                        background: '#0d0d1a',
                        color: 'white',
                        fontSize: '14px',
                        outline: 'none'
                    }}
                />
            </div>
        ),
        code: {
            'react-native': `import { GradientInput } from 'mobileui-pro';

<GradientInput
  placeholder="Type here..."
  gradient={['#f59e0b', '#ef4444']}
  value={text}
  onChangeText={setText}
  borderRadius={12}
/>`,
            flutter: `import 'package:mobileui_pro/mobileui_pro.dart';

GradientInput(
  placeholder: 'Type here...',
  gradient: [Color(0xFFf59e0b), Color(0xFFef4444)],
  controller: textController,
  borderRadius: 12,
)`
        }
    },
    {
        name: 'Toggle Switch',
        category: 'Controls',
        color: '#10b981',
        preview: (
            <div style={{
                width: '56px',
                height: '32px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                padding: '4px',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)'
            }}>
                <motion.div
                    style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '12px',
                        background: 'white'
                    }}
                    animate={{ x: [0, 22, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            </div>
        ),
        code: {
            'react-native': `import { AnimatedSwitch } from 'mobileui-pro';

<AnimatedSwitch
  value={isEnabled}
  onValueChange={setIsEnabled}
  activeColor="#10b981"
  inactiveColor="#3f3f46"
/>`,
            flutter: `import 'package:mobileui_pro/mobileui_pro.dart';

AnimatedSwitch(
  value: isEnabled,
  onChanged: (value) => setState(() => isEnabled = value),
  activeColor: Color(0xFF10b981),
  inactiveColor: Color(0xFF3f3f46),
)`
        }
    },
    {
        name: 'Floating Action',
        category: 'Buttons',
        color: '#6366f1',
        preview: (
            <motion.button
                style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 30px rgba(99, 102, 241, 0.4)'
                }}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
            >
                <span style={{ fontSize: '24px', color: 'white', fontWeight: 300 }}>+</span>
            </motion.button>
        ),
        code: {
            'react-native': `import { FloatingActionButton } from 'mobileui-pro';

<FloatingActionButton
  icon="plus"
  gradient={['#6366f1', '#4f46e5']}
  onPress={() => showModal()}
  rotateOnHover
/>`,
            flutter: `import 'package:mobileui_pro/mobileui_pro.dart';

FloatingActionButton(
  icon: Icons.add,
  gradient: [Color(0xFF6366f1), Color(0xFF4f46e5)],
  onPressed: () => showModal(),
  rotateOnHover: true,
)`
        }
    },
    {
        name: 'Progress Ring',
        category: 'Progress',
        color: '#8b5cf6',
        preview: (
            <div style={{ position: 'relative', width: '60px', height: '60px' }}>
                <svg width="60" height="60" style={{ transform: 'rotate(-90deg)' }}>
                    <circle cx="30" cy="30" r="25" fill="none" stroke="rgba(139, 92, 246, 0.2)" strokeWidth="5" />
                    <motion.circle
                        cx="30" cy="30" r="25" fill="none" stroke="#8b5cf6" strokeWidth="5"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 0.75 }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
                        style={{ strokeDasharray: '157', strokeDashoffset: '0' }}
                    />
                </svg>
                <span style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'white'
                }}>75%</span>
            </div>
        ),
        code: {
            'react-native': `import { ProgressRing } from 'mobileui-pro';

<ProgressRing
  progress={0.75}
  size={60}
  strokeWidth={5}
  color="#8b5cf6"
  showPercentage
  animated
/>`,
            flutter: `import 'package:mobileui_pro/mobileui_pro.dart';

ProgressRing(
  progress: 0.75,
  size: 60,
  strokeWidth: 5,
  color: Color(0xFF8b5cf6),
  showPercentage: true,
  animated: true,
)`
        }
    },
    {
        name: 'Skeleton Loader',
        category: 'Loaders',
        color: '#71717a',
        preview: (
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <motion.div
                    style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#27272a' }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />
                <div style={{ flex: 1 }}>
                    <motion.div
                        style={{ height: '12px', width: '100px', borderRadius: '6px', background: '#27272a', marginBottom: '8px' }}
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
                    />
                    <motion.div
                        style={{ height: '10px', width: '70px', borderRadius: '5px', background: '#27272a' }}
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                    />
                </div>
            </div>
        ),
        code: {
            'react-native': `import { Skeleton } from 'mobileui-pro';

<Skeleton.Group>
  <Skeleton.Circle size={40} />
  <Skeleton.Box width={100} height={12} />
  <Skeleton.Box width={70} height={10} />
</Skeleton.Group>`,
            flutter: `import 'package:mobileui_pro/mobileui_pro.dart';

SkeletonGroup(
  children: [
    SkeletonCircle(size: 40),
    SkeletonBox(width: 100, height: 12),
    SkeletonBox(width: 70, height: 10),
  ],
)`
        }
    }
];

const categories = ['All', 'Buttons', 'Cards', 'Forms', 'Controls', 'Loaders', 'Progress'];

export default function ComponentShowcase() {
    const [platform, setPlatform] = useState<Platform>('react-native');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const filteredComponents = selectedCategory === 'All'
        ? components
        : components.filter(c => c.category === selectedCategory);

    const handleCopy = (index: number, code: string) => {
        navigator.clipboard.writeText(code);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <section
            id="components"
            style={{
                padding: '100px 0',
                position: 'relative',
                background: '#060010'
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

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: 'center', marginBottom: '40px' }}
                >
                    <span style={{
                        display: 'inline-block',
                        padding: '6px 14px',
                        borderRadius: '100px',
                        background: 'rgba(139, 92, 246, 0.1)',
                        border: '1px solid rgba(139, 92, 246, 0.3)',
                        fontSize: '12px',
                        color: '#a78bfa',
                        fontWeight: 500,
                        marginBottom: '20px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em'
                    }}>
                        Components
                    </span>
                    <h2 style={{
                        fontSize: 'clamp(32px, 5vw, 48px)',
                        fontWeight: 700,
                        marginBottom: '16px',
                        background: 'linear-gradient(135deg, #ffffff, #a1a1aa)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        Ready-to-use UI Components
                    </h2>
                    <p style={{
                        fontSize: '16px',
                        color: '#71717a',
                        maxWidth: '500px',
                        margin: '0 auto'
                    }}>
                        Copy, paste, and customize. Each component supports both React Native and Flutter.
                    </p>
                </motion.div>

                {/* Platform Toggle */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}
                >
                    <div style={{
                        display: 'inline-flex',
                        padding: '4px',
                        borderRadius: '14px',
                        background: 'rgba(13, 13, 26, 0.8)',
                        border: '1px solid rgba(139, 92, 246, 0.2)'
                    }}>
                        <button
                            onClick={() => setPlatform('react-native')}
                            style={{
                                padding: '12px 24px',
                                borderRadius: '10px',
                                fontSize: '14px',
                                fontWeight: 600,
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                background: platform === 'react-native' ? 'linear-gradient(135deg, #8b5cf6, #7c3aed)' : 'transparent',
                                color: platform === 'react-native' ? 'white' : '#71717a',
                                boxShadow: platform === 'react-native' ? '0 4px 15px rgba(139, 92, 246, 0.3)' : 'none'
                            }}
                        >
                            React Native
                        </button>
                        <button
                            onClick={() => setPlatform('flutter')}
                            style={{
                                padding: '12px 24px',
                                borderRadius: '10px',
                                fontSize: '14px',
                                fontWeight: 600,
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                background: platform === 'flutter' ? 'linear-gradient(135deg, #22d3ee, #06b6d4)' : 'transparent',
                                color: platform === 'flutter' ? 'white' : '#71717a',
                                boxShadow: platform === 'flutter' ? '0 4px 15px rgba(34, 211, 238, 0.3)' : 'none'
                            }}
                        >
                            Flutter
                        </button>
                    </div>
                </motion.div>

                {/* Category Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{
                        display: 'flex',
                        gap: '8px',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        marginBottom: '48px'
                    }}
                >
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            style={{
                                padding: '8px 16px',
                                borderRadius: '8px',
                                fontSize: '13px',
                                fontWeight: 500,
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                background: selectedCategory === cat ? 'rgba(139, 92, 246, 0.2)' : 'transparent',
                                color: selectedCategory === cat ? '#a78bfa' : '#52525b',
                                border: selectedCategory === cat ? '1px solid rgba(139, 92, 246, 0.3)' : '1px solid transparent'
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </motion.div>

                {/* Components Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                    gap: '20px'
                }}>
                    <AnimatePresence mode="popLayout">
                        {filteredComponents.map((component, index) => (
                            <motion.div
                                key={component.name}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                style={{
                                    background: 'rgba(13, 13, 26, 0.6)',
                                    borderRadius: '20px',
                                    border: `1px solid ${component.color}25`,
                                    overflow: 'hidden',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                {/* Preview Area */}
                                <div style={{
                                    height: '140px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: `radial-gradient(circle at center, ${component.color}10 0%, transparent 70%)`,
                                    borderBottom: `1px solid ${component.color}15`
                                }}>
                                    {component.preview}
                                </div>

                                {/* Info */}
                                <div style={{ padding: '16px 20px' }}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        marginBottom: '12px'
                                    }}>
                                        <div>
                                            <div style={{ fontSize: '15px', fontWeight: 600, color: 'white' }}>{component.name}</div>
                                            <div style={{ fontSize: '12px', color: '#52525b' }}>{component.category}</div>
                                        </div>
                                        <motion.button
                                            onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '4px',
                                                padding: '8px 12px',
                                                borderRadius: '8px',
                                                background: 'rgba(139, 92, 246, 0.1)',
                                                border: 'none',
                                                color: '#a78bfa',
                                                fontSize: '12px',
                                                fontWeight: 500,
                                                cursor: 'pointer'
                                            }}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            View Code
                                            <motion.span
                                                animate={{ rotate: expandedIndex === index ? 90 : 0 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <ChevronRight size={14} />
                                            </motion.span>
                                        </motion.button>
                                    </div>

                                    {/* Code Panel */}
                                    <AnimatePresence>
                                        {expandedIndex === index && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                style={{ overflow: 'hidden' }}
                                            >
                                                <div style={{
                                                    background: 'rgba(0, 0, 0, 0.4)',
                                                    borderRadius: '12px',
                                                    padding: '16px',
                                                    marginTop: '12px'
                                                }}>
                                                    {/* Code Header */}
                                                    <div style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between',
                                                        marginBottom: '12px'
                                                    }}>
                                                        <span style={{
                                                            fontSize: '11px',
                                                            color: platform === 'react-native' ? '#a78bfa' : '#22d3ee',
                                                            fontWeight: 600,
                                                            textTransform: 'uppercase',
                                                            letterSpacing: '0.05em'
                                                        }}>
                                                            {platform === 'react-native' ? 'React Native' : 'Flutter'}
                                                        </span>
                                                        <motion.button
                                                            onClick={() => handleCopy(index, component.code[platform])}
                                                            style={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '6px',
                                                                padding: '6px 10px',
                                                                borderRadius: '6px',
                                                                background: copiedIndex === index ? 'rgba(34, 197, 94, 0.2)' : 'rgba(139, 92, 246, 0.15)',
                                                                border: 'none',
                                                                color: copiedIndex === index ? '#22c55e' : '#a78bfa',
                                                                fontSize: '11px',
                                                                fontWeight: 500,
                                                                cursor: 'pointer'
                                                            }}
                                                            whileHover={{ scale: 1.02 }}
                                                            whileTap={{ scale: 0.98 }}
                                                        >
                                                            {copiedIndex === index ? <Check size={12} /> : <Copy size={12} />}
                                                            {copiedIndex === index ? 'Copied!' : 'Copy'}
                                                        </motion.button>
                                                    </div>

                                                    {/* Code Content */}
                                                    <pre style={{
                                                        margin: 0,
                                                        padding: 0,
                                                        fontSize: '12px',
                                                        color: '#a1a1aa',
                                                        fontFamily: 'monospace',
                                                        whiteSpace: 'pre-wrap',
                                                        wordBreak: 'break-word',
                                                        lineHeight: 1.6
                                                    }}>
                                                        <code>{component.code[platform]}</code>
                                                    </pre>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
