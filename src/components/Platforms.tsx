'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const platforms = [
    {
        name: 'React Native',
        description: 'Build native iOS and Android apps with React',
        features: ['Full TypeScript support', 'Expo compatible', 'Reanimated 3 support'],
        code: `import { Button } from 'mobileui-pro';

export default function App() {
  return (
    <Button onPress={handlePress}>
      Get Started
    </Button>
  );
}`,
    },
    {
        name: 'Flutter',
        description: 'Beautiful native apps in record time',
        features: ['Dart null safety', 'Material 3 ready', 'Platform-aware'],
        code: `import 'package:mobileui_pro/mobileui_pro.dart';

class MyApp extends StatelessWidget {
  Widget build(BuildContext context) {
    return MUIButton(
      onPressed: handlePress,
      child: Text('Get Started'),
    );
  }
}`,
    },
];

export default function Platforms() {
    return (
        <section
            style={{
                padding: '120px 0',
                position: 'relative',
                background: '#000000'
            }}
        >
            {/* Top line */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)'
            }} />

            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    style={{ textAlign: 'center', marginBottom: '80px' }}
                >
                    <span style={{
                        fontSize: '13px',
                        color: '#52525b',
                        fontWeight: 500,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        display: 'block',
                        marginBottom: '16px'
                    }}>Platforms</span>
                    <h2 style={{
                        fontSize: 'clamp(32px, 5vw, 48px)',
                        fontWeight: 600,
                        color: '#ffffff',
                        marginBottom: '20px',
                        letterSpacing: '-0.02em',
                        lineHeight: 1.1
                    }}>
                        One library, two platforms
                    </h2>
                    <p style={{
                        fontSize: '18px',
                        color: '#71717a',
                        maxWidth: '500px',
                        margin: '0 auto',
                        lineHeight: 1.7
                    }}>
                        Same beautiful components, consistent APIs for both platforms.
                    </p>
                </motion.div>

                {/* Platform Cards */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                    gap: '32px'
                }}>
                    {platforms.map((platform, index) => (
                        <motion.div
                            key={platform.name}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.6 }}
                            style={{
                                padding: '32px',
                                borderRadius: '20px',
                                background: 'rgba(255,255,255,0.02)',
                                border: '1px solid rgba(255,255,255,0.08)'
                            }}
                        >
                            <div style={{ marginBottom: '24px' }}>
                                <h3 style={{ fontSize: '24px', fontWeight: 600, color: '#ffffff', marginBottom: '8px' }}>{platform.name}</h3>
                                <p style={{ fontSize: '15px', color: '#71717a' }}>{platform.description}</p>
                            </div>

                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '32px' }}>
                                {platform.features.map((feature) => (
                                    <div
                                        key={feature}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px'
                                        }}
                                    >
                                        <div style={{
                                            width: '16px',
                                            height: '16px',
                                            borderRadius: '50%',
                                            background: 'rgba(255,255,255,0.1)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <Check style={{ width: '10px', height: '10px', color: '#ffffff' }} />
                                        </div>
                                        <span style={{ fontSize: '13px', color: '#a1a1aa' }}>{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <div style={{
                                background: 'rgba(0,0,0,0.5)',
                                borderRadius: '12px',
                                padding: '20px',
                                border: '1px solid rgba(255,255,255,0.05)'
                            }}>
                                <div style={{ display: 'flex', gap: '6px', marginBottom: '16px' }}>
                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />
                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />
                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />
                                </div>
                                <pre style={{
                                    margin: 0,
                                    fontSize: '12px',
                                    color: '#a1a1aa',
                                    overflow: 'auto',
                                    fontFamily: 'monospace'
                                }}>
                                    <code>{platform.code}</code>
                                </pre>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
