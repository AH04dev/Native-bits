'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Copy, Check, RotateCcw, Sparkles, ArrowLeft, Smartphone, Tablet, Monitor } from 'lucide-react';
import Link from 'next/link';

type Platform = 'react-native' | 'flutter';
type DeviceType = 'phone' | 'tablet' | 'desktop';

const starterTemplates = {
    'react-native': {
        button: `import { AnimatedButton } from 'mobileui-pro';
import { View } from 'react-native';

export default function App() {
  const handlePress = () => {
    console.log('Button pressed!');
  };

  return (
    <View style={{ 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundColor: '#060010'
    }}>
      <AnimatedButton
        title="Click Me"
        variant="primary"
        onPress={handlePress}
        gradient={['#8b5cf6', '#7c3aed']}
      />
    </View>
  );
}`,
        card: `import { GradientCard } from 'mobileui-pro';
import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ 
      flex: 1, 
      padding: 20,
      backgroundColor: '#060010'
    }}>
      <GradientCard
        gradient={['#22d3ee', '#06b6d4']}
        title="Welcome"
        description="This is an interactive card"
        onPress={() => alert('Card tapped!')}
      />
    </View>
  );
}`,
        animation: `import { FadeInUp, Bounce } from 'mobileui-pro/animations';
import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundColor: '#060010'
    }}>
      <FadeInUp duration={600}>
        <Text style={{ color: 'white', fontSize: 24 }}>
          Hello World!
        </Text>
      </FadeInUp>
      
      <Bounce height={20} loop>
        <View style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: '#8b5cf6',
          marginTop: 30
        }} />
      </Bounce>
    </View>
  );
}`
    },
    flutter: {
        button: `import 'package:flutter/material.dart';
import 'package:mobileui_pro/mobileui_pro.dart';

class MyApp extends StatelessWidget {
  void handlePress() {
    print('Button pressed!');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFF060010),
      body: Center(
        child: AnimatedButton(
          text: 'Click Me',
          variant: ButtonVariant.primary,
          onPressed: handlePress,
          gradient: [Color(0xFF8b5cf6), Color(0xFF7c3aed)],
        ),
      ),
    );
  }
}`,
        card: `import 'package:flutter/material.dart';
import 'package:mobileui_pro/mobileui_pro.dart';

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFF060010),
      body: Padding(
        padding: EdgeInsets.all(20),
        child: GradientCard(
          gradient: [Color(0xFF22d3ee), Color(0xFF06b6d4)],
          title: 'Welcome',
          description: 'This is an interactive card',
          onTap: () => showSnackBar('Card tapped!'),
        ),
      ),
    );
  }
}`,
        animation: `import 'package:flutter/material.dart';
import 'package:mobileui_pro/animations.dart';

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFF060010),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            FadeInUp(
              duration: Duration(milliseconds: 600),
              child: Text(
                'Hello World!',
                style: TextStyle(color: Colors.white, fontSize: 24),
              ),
            ),
            SizedBox(height: 30),
            Bounce(
              height: 20,
              loop: true,
              child: Container(
                width: 60,
                height: 60,
                decoration: BoxDecoration(
                  color: Color(0xFF8b5cf6),
                  shape: BoxShape.circle,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}`
    }
};

export default function SandboxPage() {
    const [platform, setPlatform] = useState<Platform>('react-native');
    const [code, setCode] = useState(starterTemplates['react-native'].button);
    const [template, setTemplate] = useState('button');
    const [copied, setCopied] = useState(false);
    const [isRunning, setIsRunning] = useState(true);
    const [device, setDevice] = useState<DeviceType>('phone');
    const [logs, setLogs] = useState<string[]>([
        '> App initialized',
        '> Waiting for changes...'
    ]);

    useEffect(() => {
        setCode(starterTemplates[platform][template as keyof typeof starterTemplates['react-native']]);
    }, [platform, template]);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleReset = () => {
        setCode(starterTemplates[platform][template as keyof typeof starterTemplates['react-native']]);
        setLogs(prev => [...prev, '> Code reset to template']);
    };

    const handleRun = () => {
        setIsRunning(false);
        setLogs(prev => [...prev, '> Compiling...']);
        setTimeout(() => {
            setIsRunning(true);
            setLogs(prev => [...prev, '> Build successful!', '> App running']);
        }, 800);
    };

    const deviceSizes = {
        phone: { width: '320px', height: '568px' },
        tablet: { width: '500px', height: '600px' },
        desktop: { width: '100%', height: '100%' }
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: '#060010',
            display: 'flex',
            flexDirection: 'column'
        }}>
            {/* Header */}
            <header style={{
                padding: '16px 24px',
                borderBottom: '1px solid rgba(139, 92, 246, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'rgba(6, 0, 16, 0.95)',
                backdropFilter: 'blur(20px)',
                position: 'sticky',
                top: 0,
                zIndex: 50
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <Link
                        href="/"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            color: '#a1a1aa',
                            textDecoration: 'none',
                            fontSize: '14px'
                        }}
                    >
                        <ArrowLeft size={18} />
                        Back
                    </Link>
                    <div style={{ width: '1px', height: '24px', background: 'rgba(139, 92, 246, 0.2)' }} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '8px',
                            background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Sparkles size={16} color="white" />
                        </div>
                        <span style={{ fontSize: '16px', fontWeight: 600, color: 'white' }}>Sandbox</span>
                    </div>
                </div>

                {/* Platform Toggle */}
                <div style={{
                    display: 'flex',
                    padding: '4px',
                    borderRadius: '10px',
                    background: 'rgba(13, 13, 26, 0.8)',
                    border: '1px solid rgba(139, 92, 246, 0.2)'
                }}>
                    <button
                        onClick={() => setPlatform('react-native')}
                        style={{
                            padding: '8px 16px',
                            borderRadius: '6px',
                            fontSize: '13px',
                            fontWeight: 600,
                            border: 'none',
                            cursor: 'pointer',
                            background: platform === 'react-native' ? 'linear-gradient(135deg, #8b5cf6, #7c3aed)' : 'transparent',
                            color: platform === 'react-native' ? 'white' : '#71717a'
                        }}
                    >
                        React Native
                    </button>
                    <button
                        onClick={() => setPlatform('flutter')}
                        style={{
                            padding: '8px 16px',
                            borderRadius: '6px',
                            fontSize: '13px',
                            fontWeight: 600,
                            border: 'none',
                            cursor: 'pointer',
                            background: platform === 'flutter' ? 'linear-gradient(135deg, #22d3ee, #06b6d4)' : 'transparent',
                            color: platform === 'flutter' ? 'white' : '#71717a'
                        }}
                    >
                        Flutter
                    </button>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '8px' }}>
                    <motion.button
                        onClick={handleRun}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '8px 16px',
                            borderRadius: '8px',
                            background: 'linear-gradient(135deg, #10b981, #059669)',
                            border: 'none',
                            color: 'white',
                            fontSize: '13px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Play size={14} />
                        Run
                    </motion.button>
                </div>
            </header>

            {/* Main Content */}
            <div style={{
                flex: 1,
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0'
            }}>
                {/* Code Editor Panel */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    borderRight: '1px solid rgba(139, 92, 246, 0.15)'
                }}>
                    {/* Editor Header */}
                    <div style={{
                        padding: '12px 16px',
                        borderBottom: '1px solid rgba(139, 92, 246, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        background: 'rgba(13, 13, 26, 0.5)'
                    }}>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            {['button', 'card', 'animation'].map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setTemplate(t)}
                                    style={{
                                        padding: '6px 12px',
                                        borderRadius: '6px',
                                        fontSize: '12px',
                                        fontWeight: 500,
                                        border: 'none',
                                        cursor: 'pointer',
                                        background: template === t ? 'rgba(139, 92, 246, 0.2)' : 'transparent',
                                        color: template === t ? '#a78bfa' : '#52525b',
                                        textTransform: 'capitalize'
                                    }}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <motion.button
                                onClick={handleReset}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    padding: '6px 10px',
                                    borderRadius: '6px',
                                    background: 'rgba(139, 92, 246, 0.1)',
                                    border: 'none',
                                    color: '#a78bfa',
                                    fontSize: '12px',
                                    cursor: 'pointer'
                                }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <RotateCcw size={12} />
                                Reset
                            </motion.button>
                            <motion.button
                                onClick={handleCopy}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    padding: '6px 10px',
                                    borderRadius: '6px',
                                    background: copied ? 'rgba(34, 197, 94, 0.2)' : 'rgba(139, 92, 246, 0.1)',
                                    border: 'none',
                                    color: copied ? '#22c55e' : '#a78bfa',
                                    fontSize: '12px',
                                    cursor: 'pointer'
                                }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {copied ? <Check size={12} /> : <Copy size={12} />}
                                {copied ? 'Copied' : 'Copy'}
                            </motion.button>
                        </div>
                    </div>

                    {/* Code Editor */}
                    <div style={{ flex: 1, position: 'relative' }}>
                        <textarea
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            spellCheck={false}
                            style={{
                                width: '100%',
                                height: '100%',
                                padding: '20px',
                                background: 'rgba(0, 0, 0, 0.3)',
                                border: 'none',
                                color: '#e4e4e7',
                                fontSize: '13px',
                                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                                lineHeight: 1.6,
                                resize: 'none',
                                outline: 'none'
                            }}
                        />
                        {/* Line Numbers Overlay Hint */}
                        <div style={{
                            position: 'absolute',
                            bottom: '12px',
                            right: '12px',
                            fontSize: '11px',
                            color: '#3f3f46',
                            background: 'rgba(13, 13, 26, 0.8)',
                            padding: '4px 8px',
                            borderRadius: '4px'
                        }}>
                            {platform === 'react-native' ? 'TypeScript' : 'Dart'}
                        </div>
                    </div>

                    {/* Console */}
                    <div style={{
                        height: '120px',
                        borderTop: '1px solid rgba(139, 92, 246, 0.1)',
                        background: 'rgba(0, 0, 0, 0.4)',
                        padding: '12px 16px',
                        overflow: 'auto'
                    }}>
                        <div style={{ fontSize: '11px', color: '#52525b', marginBottom: '8px', fontWeight: 600 }}>CONSOLE</div>
                        {logs.map((log, i) => (
                            <div key={i} style={{ fontSize: '12px', color: '#71717a', marginBottom: '4px', fontFamily: 'monospace' }}>
                                {log}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Preview Panel */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    background: 'rgba(13, 13, 26, 0.3)'
                }}>
                    {/* Preview Header */}
                    <div style={{
                        padding: '12px 16px',
                        borderBottom: '1px solid rgba(139, 92, 246, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        background: 'rgba(13, 13, 26, 0.5)'
                    }}>
                        <span style={{ fontSize: '13px', fontWeight: 600, color: 'white' }}>Live Preview</span>
                        <div style={{ display: 'flex', gap: '4px' }}>
                            {[
                                { type: 'phone' as DeviceType, icon: Smartphone },
                                { type: 'tablet' as DeviceType, icon: Tablet },
                                { type: 'desktop' as DeviceType, icon: Monitor }
                            ].map(({ type, icon: Icon }) => (
                                <button
                                    key={type}
                                    onClick={() => setDevice(type)}
                                    style={{
                                        padding: '6px 8px',
                                        borderRadius: '6px',
                                        background: device === type ? 'rgba(139, 92, 246, 0.2)' : 'transparent',
                                        border: 'none',
                                        color: device === type ? '#a78bfa' : '#52525b',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <Icon size={16} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Preview Area */}
                    <div style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '24px',
                        background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.05) 0%, transparent 70%)'
                    }}>
                        <motion.div
                            key={`${device}-${isRunning}`}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            style={{
                                width: deviceSizes[device].width,
                                height: deviceSizes[device].height,
                                maxWidth: '100%',
                                maxHeight: '100%',
                                borderRadius: device === 'phone' ? '40px' : device === 'tablet' ? '24px' : '12px',
                                background: '#000000',
                                border: device !== 'desktop' ? '8px solid #1a1a2e' : '2px solid rgba(139, 92, 246, 0.2)',
                                overflow: 'hidden',
                                position: 'relative',
                                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
                            }}
                        >
                            {/* Device Notch (for phone) */}
                            {device === 'phone' && (
                                <div style={{
                                    position: 'absolute',
                                    top: '0',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: '120px',
                                    height: '28px',
                                    background: '#1a1a2e',
                                    borderRadius: '0 0 16px 16px',
                                    zIndex: 10
                                }} />
                            )}

                            {/* Preview Content */}
                            <div style={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: '#060010'
                            }}>
                                {isRunning ? (
                                    <div style={{ textAlign: 'center' }}>
                                        {/* Simulated Preview */}
                                        {template === 'button' && (
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
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => setLogs(prev => [...prev, '> Button pressed!'])}
                                            >
                                                Click Me
                                            </motion.button>
                                        )}
                                        {template === 'card' && (
                                            <motion.div
                                                style={{
                                                    width: '200px',
                                                    padding: '20px',
                                                    background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.15), rgba(34, 211, 238, 0.05))',
                                                    borderRadius: '16px',
                                                    border: '1px solid rgba(34, 211, 238, 0.3)'
                                                }}
                                                whileHover={{ scale: 1.02 }}
                                            >
                                                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#22d3ee', marginBottom: '16px' }} />
                                                <div style={{ fontSize: '16px', fontWeight: 600, color: 'white', marginBottom: '6px' }}>Welcome</div>
                                                <div style={{ fontSize: '13px', color: '#71717a' }}>This is an interactive card</div>
                                            </motion.div>
                                        )}
                                        {template === 'animation' && (
                                            <div>
                                                <motion.div
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.6 }}
                                                >
                                                    <div style={{ fontSize: '20px', color: 'white', marginBottom: '24px' }}>Hello World!</div>
                                                </motion.div>
                                                <motion.div
                                                    style={{
                                                        width: '60px',
                                                        height: '60px',
                                                        borderRadius: '50%',
                                                        background: '#8b5cf6',
                                                        margin: '0 auto'
                                                    }}
                                                    animate={{ y: [0, -20, 0] }}
                                                    transition={{ duration: 1, repeat: Infinity }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        {[0, 1, 2].map((i) => (
                                            <motion.div
                                                key={i}
                                                style={{
                                                    width: '12px',
                                                    height: '12px',
                                                    borderRadius: '50%',
                                                    background: '#8b5cf6'
                                                }}
                                                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                                                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
