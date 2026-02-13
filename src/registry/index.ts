export interface RegistryItem {
    name: string;
    slug: string;
    description: string;
    category: 'component' | 'animation';
    dependencies: string[];
    file: string;
    preview: string; // path to preview component
    props: {
        name: string;
        type: string;
        default?: string;
        description: string;
    }[];
}

export const registry: RegistryItem[] = [
    // ─── Components ──────────────────────────────
    {
        name: 'Animated Button',
        slug: 'animated-button',
        description: 'A pressable button with spring scale animation and optional gradient background.',
        category: 'component',
        dependencies: ['react-native-reanimated'],
        file: 'components/animated-button.tsx',
        preview: 'components/animated-button',
        props: [
            { name: 'title', type: 'string', description: 'Button label text' },
            { name: 'onPress', type: '() => void', description: 'Press callback' },
            { name: 'variant', type: "'solid' | 'outline' | 'ghost'", default: "'solid'", description: 'Visual style variant' },
            { name: 'gradientColors', type: '[string, string]', default: "['#10B981', '#06B6D4']", description: 'Gradient start/end colors' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable interactions' },
        ],
    },
    {
        name: 'Glass Card',
        slug: 'glass-card',
        description: 'A frosted-glass card with blur backdrop and subtle border glow.',
        category: 'component',
        dependencies: ['react-native-reanimated', 'expo-blur'],
        file: 'components/glass-card.tsx',
        preview: 'components/glass-card',
        props: [
            { name: 'children', type: 'ReactNode', description: 'Card content' },
            { name: 'intensity', type: 'number', default: '40', description: 'Blur intensity (0-100)' },
            { name: 'tint', type: "'light' | 'dark'", default: "'dark'", description: 'Blur tint color' },
            { name: 'borderColor', type: 'string', default: "'rgba(255,255,255,0.1)'", description: 'Border color' },
        ],
    },
    {
        name: 'Toggle Switch',
        slug: 'toggle-switch',
        description: 'A smooth animated toggle with customizable track and thumb colors.',
        category: 'component',
        dependencies: ['react-native-reanimated'],
        file: 'components/toggle-switch.tsx',
        preview: 'components/toggle-switch',
        props: [
            { name: 'value', type: 'boolean', description: 'Current toggle state' },
            { name: 'onToggle', type: '(value: boolean) => void', description: 'Toggle callback' },
            { name: 'activeColor', type: 'string', default: "'#10B981'", description: 'Track color when active' },
            { name: 'inactiveColor', type: 'string', default: "'#374151'", description: 'Track color when inactive' },
            { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Toggle size' },
        ],
    },
    {
        name: 'Input Field',
        slug: 'input-field',
        description: 'A text input with animated floating label and focus-state border glow.',
        category: 'component',
        dependencies: ['react-native-reanimated'],
        file: 'components/input-field.tsx',
        preview: 'components/input-field',
        props: [
            { name: 'label', type: 'string', description: 'Floating label text' },
            { name: 'value', type: 'string', description: 'Input value' },
            { name: 'onChangeText', type: '(text: string) => void', description: 'Text change callback' },
            { name: 'icon', type: 'ReactNode', description: 'Leading icon element' },
            { name: 'error', type: 'string', description: 'Error message to display' },
            { name: 'secureTextEntry', type: 'boolean', default: 'false', description: 'Password mode' },
        ],
    },
    {
        name: 'Notification Toast',
        slug: 'notification-toast',
        description: 'A slide-in notification toast with auto-dismiss and swipe-to-close.',
        category: 'component',
        dependencies: ['react-native-reanimated', 'react-native-gesture-handler'],
        file: 'components/notification-toast.tsx',
        preview: 'components/notification-toast',
        props: [
            { name: 'message', type: 'string', description: 'Toast message text' },
            { name: 'type', type: "'success' | 'error' | 'warning' | 'info'", default: "'info'", description: 'Toast variant' },
            { name: 'duration', type: 'number', default: '3000', description: 'Auto-dismiss duration (ms)' },
            { name: 'onDismiss', type: '() => void', description: 'Dismiss callback' },
            { name: 'position', type: "'top' | 'bottom'", default: "'top'", description: 'Toast position' },
        ],
    },
    {
        name: 'Floating Action Button',
        slug: 'floating-action-button',
        description: 'An animated FAB with spring press effect and gradient background.',
        category: 'component',
        dependencies: ['react-native-reanimated'],
        file: 'components/floating-action-button.tsx',
        preview: 'components/floating-action-button',
        props: [
            { name: 'icon', type: 'ReactNode', description: 'Icon element to display' },
            { name: 'onPress', type: '() => void', description: 'Press callback' },
            { name: 'gradientColors', type: '[string, string]', default: "['#10B981', '#06B6D4']", description: 'Gradient colors' },
            { name: 'size', type: 'number', default: '56', description: 'Button diameter' },
            { name: 'position', type: "{ bottom: number; right: number }", default: '{ bottom: 24, right: 24 }', description: 'Absolute position' },
        ],
    },
    {
        name: 'Progress Ring',
        slug: 'progress-ring',
        description: 'An animated circular progress indicator with gradient stroke.',
        category: 'component',
        dependencies: ['react-native-reanimated', 'react-native-svg'],
        file: 'components/progress-ring.tsx',
        preview: 'components/progress-ring',
        props: [
            { name: 'progress', type: 'number', description: 'Progress value (0-100)' },
            { name: 'size', type: 'number', default: '120', description: 'Ring diameter' },
            { name: 'strokeWidth', type: 'number', default: '8', description: 'Stroke width' },
            { name: 'gradientColors', type: '[string, string]', default: "['#10B981', '#06B6D4']", description: 'Gradient colors' },
            { name: 'animated', type: 'boolean', default: 'true', description: 'Animate on mount' },
        ],
    },
    {
        name: 'Skeleton Loader',
        slug: 'skeleton-loader',
        description: 'A shimmer placeholder loader for content loading states.',
        category: 'component',
        dependencies: ['react-native-reanimated', 'react-native-linear-gradient'],
        file: 'components/skeleton-loader.tsx',
        preview: 'components/skeleton-loader',
        props: [
            { name: 'width', type: "number | string", default: "'100%'", description: 'Skeleton width' },
            { name: 'height', type: 'number', default: '20', description: 'Skeleton height' },
            { name: 'borderRadius', type: 'number', default: '8', description: 'Corner radius' },
            { name: 'baseColor', type: 'string', default: "'#1F2937'", description: 'Base background color' },
            { name: 'highlightColor', type: 'string', default: "'#374151'", description: 'Shimmer highlight color' },
        ],
    },

    // ─── Animations ──────────────────────────────
    {
        name: 'Fade In Up',
        slug: 'fade-in-up',
        description: 'Fades in children while sliding up from below.',
        category: 'animation',
        dependencies: ['react-native-reanimated'],
        file: 'animations/fade-in-up.tsx',
        preview: 'animations/fade-in-up',
        props: [
            { name: 'children', type: 'ReactNode', description: 'Content to animate' },
            { name: 'delay', type: 'number', default: '0', description: 'Animation delay (ms)' },
            { name: 'duration', type: 'number', default: '600', description: 'Animation duration (ms)' },
            { name: 'distance', type: 'number', default: '30', description: 'Y offset distance' },
        ],
    },
    {
        name: 'Scale Pop',
        slug: 'scale-pop',
        description: 'Springs children into view with an elastic scale effect.',
        category: 'animation',
        dependencies: ['react-native-reanimated'],
        file: 'animations/scale-pop.tsx',
        preview: 'animations/scale-pop',
        props: [
            { name: 'children', type: 'ReactNode', description: 'Content to animate' },
            { name: 'delay', type: 'number', default: '0', description: 'Animation delay (ms)' },
            { name: 'damping', type: 'number', default: '12', description: 'Spring damping' },
            { name: 'stiffness', type: 'number', default: '100', description: 'Spring stiffness' },
        ],
    },
    {
        name: 'Rotate In',
        slug: 'rotate-in',
        description: 'Rotates children into view with a scale-up effect.',
        category: 'animation',
        dependencies: ['react-native-reanimated'],
        file: 'animations/rotate-in.tsx',
        preview: 'animations/rotate-in',
        props: [
            { name: 'children', type: 'ReactNode', description: 'Content to animate' },
            { name: 'degrees', type: 'number', default: '360', description: 'Rotation degrees' },
            { name: 'duration', type: 'number', default: '800', description: 'Animation duration (ms)' },
            { name: 'delay', type: 'number', default: '0', description: 'Animation delay (ms)' },
        ],
    },
    {
        name: 'Slide In Right',
        slug: 'slide-in-right',
        description: 'Slides children in from the right edge.',
        category: 'animation',
        dependencies: ['react-native-reanimated'],
        file: 'animations/slide-in-right.tsx',
        preview: 'animations/slide-in-right',
        props: [
            { name: 'children', type: 'ReactNode', description: 'Content to animate' },
            { name: 'offset', type: 'number', default: '100', description: 'Starting X offset' },
            { name: 'duration', type: 'number', default: '500', description: 'Animation duration (ms)' },
            { name: 'delay', type: 'number', default: '0', description: 'Animation delay (ms)' },
        ],
    },
    {
        name: 'Bounce',
        slug: 'bounce',
        description: 'Continuously bounces children on the Y axis.',
        category: 'animation',
        dependencies: ['react-native-reanimated'],
        file: 'animations/bounce.tsx',
        preview: 'animations/bounce',
        props: [
            { name: 'children', type: 'ReactNode', description: 'Content to animate' },
            { name: 'height', type: 'number', default: '20', description: 'Bounce height' },
            { name: 'duration', type: 'number', default: '600', description: 'Bounce cycle duration (ms)' },
        ],
    },
    {
        name: 'Flip',
        slug: 'flip',
        description: '3D flip animation along the Y or X axis.',
        category: 'animation',
        dependencies: ['react-native-reanimated'],
        file: 'animations/flip.tsx',
        preview: 'animations/flip',
        props: [
            { name: 'children', type: 'ReactNode', description: 'Content to animate' },
            { name: 'direction', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Flip axis' },
            { name: 'duration', type: 'number', default: '800', description: 'Flip duration (ms)' },
            { name: 'delay', type: 'number', default: '0', description: 'Animation delay (ms)' },
        ],
    },
    {
        name: 'Shimmer',
        slug: 'shimmer',
        description: 'A horizontal shimmer/skeleton loading effect.',
        category: 'animation',
        dependencies: ['react-native-reanimated', 'react-native-linear-gradient'],
        file: 'animations/shimmer.tsx',
        preview: 'animations/shimmer',
        props: [
            { name: 'width', type: 'number', default: '200', description: 'Shimmer width' },
            { name: 'height', type: 'number', default: '48', description: 'Shimmer height' },
            { name: 'baseColor', type: 'string', default: "'#1F2937'", description: 'Base color' },
            { name: 'highlightColor', type: 'string', default: "'rgba(102,126,234,0.2)'", description: 'Highlight sweep color' },
        ],
    },
    {
        name: 'Stagger List',
        slug: 'stagger-list',
        description: 'Animates a list of children with staggered delays.',
        category: 'animation',
        dependencies: ['react-native-reanimated'],
        file: 'animations/stagger-list.tsx',
        preview: 'animations/stagger-list',
        props: [
            { name: 'children', type: 'ReactNode[]', description: 'List items to stagger' },
            { name: 'staggerDelay', type: 'number', default: '100', description: 'Delay between each item (ms)' },
            { name: 'animation', type: "'fadeInUp' | 'scaleIn' | 'slideRight'", default: "'fadeInUp'", description: 'Animation type per item' },
            { name: 'duration', type: 'number', default: '400', description: 'Per-item animation duration (ms)' },
        ],
    },
];

export const components = registry.filter(item => item.category === 'component');
export const animations = registry.filter(item => item.category === 'animation');

export function getRegistryItem(slug: string): RegistryItem | undefined {
    return registry.find(item => item.slug === slug);
}
