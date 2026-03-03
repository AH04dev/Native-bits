# Building an Exact NativeWindUI Clone
### Expo · Expo Router · NativeWind v4 · rn-primitives · TypeScript · EAS + Vercel (web)

---

## HOW NATIVEWINDUI ACTUALLY WORKS

Before writing a single line of code, understand the real layer stack:

```
┌─────────────────────────────────────────────────────┐
│                  YOUR COMPONENT                      │
│        components/nativewindui/Button.tsx            │
│                                                     │
│   Uses: rn-primitives (headless, accessible base)   │
│   Styled with: NativeWind className="..." props      │
│   Variants via: class-variance-authority (CVA)       │
└─────────────────────────────────────────────────────┘
            ↓                        ↓
┌──────────────────┐     ┌──────────────────────────┐
│   rn-primitives  │     │       NativeWind v4        │
│  (like Radix UI  │     │  Translates Tailwind CSS   │
│   but for RN)    │     │  → StyleSheet.create()     │
│  Handles a11y,   │     │  on native                 │
│  state, ARIA     │     │  → CSS on web              │
└──────────────────┘     └──────────────────────────┘
            ↓                        ↓
┌─────────────────────────────────────────────────────┐
│              React Native Primitives                 │
│         View · Text · Pressable · ScrollView         │
│         (NOT div, span, button — never HTML)         │
└─────────────────────────────────────────────────────┘
            ↓
┌─────────────────────────────────────────────────────┐
│                  Expo Router                         │
│   File-based routing (like Next.js, but for RN)     │
│   app/_layout.tsx · app/(tabs)/index.tsx             │
└─────────────────────────────────────────────────────┘
            ↓
┌────────────────────────────────────────────────────┐
│              Expo (Build System)                    │
│  iOS → EAS Build  |  Android → EAS Build           │
│  Web  → expo export --platform web → Vercel        │
└────────────────────────────────────────────────────┘
```

**Key insight:** NativeWindUI is NOT a Next.js project. It is a pure Expo app.
Next.js only appears if you build a separate docs/showcase website.
Vercel only hosts the **web output** of the Expo app (`expo export --platform web`).

---

## PHASE 1 — SCAFFOLDING

### 1.1 Create the Expo App

```bash
# Use bun (NativeWindUI uses bun, but npm/yarn work too)
npx create-expo-app@latest my-ui --template blank-typescript
cd my-ui

# OR with bun
bun create expo my-ui --template blank-typescript
cd my-ui
```

### 1.2 Install Expo Router

```bash
npx expo install expo-router expo-constants expo-linking expo-status-bar
```

Update `package.json` — change the `main` entry point:
```json
{
  "main": "expo-router/entry"
}
```

### 1.3 Install NativeWind v4 + Tailwind

```bash
npx expo install nativewind tailwindcss
npx expo install react-native-reanimated react-native-safe-area-context
```

### 1.4 Install rn-primitives

These are the headless accessible building blocks — equivalent to Radix UI but for React Native:

```bash
npx expo install @rn-primitives/dialog
npx expo install @rn-primitives/tabs
npx expo install @rn-primitives/switch
npx expo install @rn-primitives/checkbox
npx expo install @rn-primitives/select
npx expo install @rn-primitives/slider
npx expo install @rn-primitives/progress
npx expo install @rn-primitives/tooltip
npx expo install @rn-primitives/popover
npx expo install @rn-primitives/dropdown-menu
npx expo install @rn-primitives/context-menu
npx expo install @rn-primitives/avatar
npx expo install @rn-primitives/separator
npx expo install @rn-primitives/label
npx expo install @rn-primitives/toggle
npx expo install @rn-primitives/types
npx expo install @rn-primitives/hooks
```

### 1.5 Install Remaining Dependencies

```bash
# Variants (same CVA used by shadcn/ui)
npm install class-variance-authority

# Safe class merging
npm install clsx tailwind-merge

# Icons
npx expo install @expo/vector-icons lucide-react-native

# SVG support (required for lucide-react-native)
npx expo install react-native-svg

# Performance list rendering
npx expo install @shopify/flash-list

# Haptics (for native press feel)
npx expo install expo-haptics

# Font loading
npx expo install expo-font

# Image
npx expo install expo-image
```

---

## PHASE 2 — CONFIGURATION FILES

### 2.1 app.json

```json
{
  "expo": {
    "name": "MyUI",
    "slug": "my-ui",
    "version": "1.0.0",
    "scheme": "my-ui",
    "platforms": ["ios", "android", "web"],
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/favicon.png"
    },
    "plugins": [
      "expo-router",
      "expo-font"
    ],
    "experiments": {
      "typedRoutes": true
    }
  }
}
```

### 2.2 babel.config.js

```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
    ],
    plugins: [
      'react-native-reanimated/plugin', // MUST be last
    ],
  };
};
```

### 2.3 metro.config.js

```js
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: './global.css' });
```

### 2.4 tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  // NativeWind preset is REQUIRED
  presets: [require('nativewind/preset')],

  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './lib/**/*.{js,jsx,ts,tsx}',
  ],

  theme: {
    extend: {
      // Map to CSS variables for dark mode theming
      // (same pattern NativeWindUI uses)
      colors: {
        background:  'hsl(var(--background))',
        foreground:  'hsl(var(--foreground))',
        primary: {
          DEFAULT:    'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT:    'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT:    'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        destructive: {
          DEFAULT:    'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border:   'hsl(var(--border))',
        input:    'hsl(var(--input))',
        ring:     'hsl(var(--ring))',
        card: {
          DEFAULT:    'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },

  plugins: [],
};
```

### 2.5 global.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 240 5.9% 10%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --destructive: 0 72% 51%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 240 4.9% 83.9%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
  }
}
```

### 2.6 nativewind-env.d.ts

```ts
/// <reference types="nativewind/types" />
```

### 2.7 tsconfig.json

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "paths": {
      "~/*": ["./*"]
    }
  }
}
```

---

## PHASE 3 — PROJECT STRUCTURE

This mirrors the **actual NativeWindUI repo structure**:

```
my-ui/
├── app/                         ← Expo Router (file-based routing)
│   ├── _layout.tsx              ← Root layout (providers, theme)
│   ├── +not-found.tsx
│   └── (tabs)/
│       ├── _layout.tsx          ← Tab bar layout
│       ├── index.tsx            ← Component showcase home
│       ├── button.tsx           ← Button demo screen
│       ├── card.tsx
│       ├── dialog.tsx
│       └── ...                  ← One screen per component
│
├── components/
│   └── nativewindui/            ← YOUR COMPONENT LIBRARY (core)
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Dialog.tsx
│       ├── Text.tsx
│       ├── Switch.tsx
│       ├── Checkbox.tsx
│       ├── Select.tsx
│       ├── Slider.tsx
│       ├── Progress.tsx
│       ├── Avatar.tsx
│       ├── Badge.tsx
│       ├── Separator.tsx
│       ├── ActivityIndicator.tsx
│       ├── List.tsx
│       └── index.ts             ← Barrel export
│
├── lib/
│   ├── utils.ts                 ← cn() helper
│   └── useColorScheme.ts        ← Dark mode hook
│
├── theme/
│   ├── index.ts                 ← Theme tokens
│   └── colors.ts                ← iOS/Android color system
│
├── assets/
│   ├── fonts/
│   └── images/
│
├── global.css                   ← Tailwind entry (NW reads this)
├── app.json
├── babel.config.js
├── metro.config.js
├── tailwind.config.js
├── nativewind-env.d.ts
└── tsconfig.json
```

---

## PHASE 4 — CORE UTILITIES

### 4.1 `lib/utils.ts` — The cn() helper

```ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### 4.2 `lib/useColorScheme.ts` — Dark mode hook

```ts
import { useColorScheme as useNativeColorScheme } from 'react-native';

export function useColorScheme() {
  const colorScheme = useNativeColorScheme();
  return {
    colorScheme: colorScheme ?? 'light',
    isDarkColorScheme: colorScheme === 'dark',
  };
}
```

### 4.3 `theme/colors.ts`

```ts
// iOS system colors — matches what NativeWindUI uses
export const NAV_THEME = {
  light: {
    background: 'hsl(0, 0%, 100%)',
    border: 'hsl(240, 5.9%, 90%)',
    card: 'hsl(0, 0%, 100%)',
    notification: 'hsl(0, 84.2%, 60.2%)',
    primary: 'hsl(240, 5.9%, 10%)',
    text: 'hsl(240, 10%, 3.9%)',
  },
  dark: {
    background: 'hsl(240, 10%, 3.9%)',
    border: 'hsl(240, 3.7%, 15.9%)',
    card: 'hsl(240, 10%, 3.9%)',
    notification: 'hsl(0, 72%, 51%)',
    primary: 'hsl(0, 0%, 98%)',
    text: 'hsl(0, 0%, 98%)',
  },
};
```

---

## PHASE 5 — ROOT LAYOUT

`app/_layout.tsx`:

```tsx
import '~/global.css';

import { Theme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform } from 'react-native';
import { NAV_THEME } from '~/theme/colors';
import { useColorScheme } from '~/lib/useColorScheme';

const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
  fonts: {
    regular: { fontFamily: 'System', fontWeight: '400' },
    medium:  { fontFamily: 'System', fontWeight: '500' },
    bold:    { fontFamily: 'System', fontWeight: '600' },
    heavy:   { fontFamily: 'System', fontWeight: '700' },
  },
};

const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
  fonts: LIGHT_THEME.fonts,
};

export default function RootLayout() {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
    </ThemeProvider>
  );
}
```

---

## PHASE 6 — BUILDING COMPONENTS

This is the core of NativeWindUI. Every component follows this exact pattern:
**rn-primitive (headless base) → styled with NativeWind className → variants via CVA**

### 6.1 Text Component

`components/nativewindui/Text.tsx`:
```tsx
import * as React from 'react';
import { Text as RNText } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '~/lib/utils';

const textVariants = cva('text-foreground', {
  variants: {
    variant: {
      largeTitle:  'text-4xl font-bold',
      title1:      'text-2xl font-bold',
      title2:      'text-xl font-bold',
      title3:      'text-lg font-semibold',
      heading:     'text-base font-semibold',
      body:        'text-base font-normal',
      callout:     'text-[15px] font-normal',
      subhead:     'text-sm font-normal',
      footnote:    'text-[13px] font-normal',
      caption1:    'text-xs font-normal',
      caption2:    'text-[11px] font-normal',
    },
    color: {
      primary:    '',
      secondary:  'text-muted-foreground',
      destructive: 'text-destructive',
    },
  },
  defaultVariants: {
    variant: 'body',
    color: 'primary',
  },
});

type TextProps = React.ComponentPropsWithoutRef<typeof RNText> &
  VariantProps<typeof textVariants>;

function Text({ className, variant, color, ...props }: TextProps) {
  return (
    <RNText
      className={cn(textVariants({ variant, color }), className)}
      {...props}
    />
  );
}

export { Text, textVariants };
```

### 6.2 Button Component

`components/nativewindui/Button.tsx`:
```tsx
import * as React from 'react';
import { Pressable } from 'react-native';
import * as Haptics from 'expo-haptics';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '~/lib/utils';
import { Text } from './Text';

const buttonVariants = cva(
  'flex-row items-center justify-center gap-2 rounded-full active:opacity-80',
  {
    variants: {
      variant: {
        default:     'bg-primary',
        secondary:   'bg-secondary',
        destructive: 'bg-destructive',
        outline:     'border border-input bg-background',
        ghost:       'bg-transparent',
        tonal:       'bg-secondary',
      },
      size: {
        sm:   'h-9  px-4  gap-1.5',
        md:   'h-11 px-5',
        lg:   'h-14 px-6  rounded-2xl',
        icon: 'h-11 w-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

const buttonTextVariants = cva('font-semibold', {
  variants: {
    variant: {
      default:     'text-primary-foreground',
      secondary:   'text-secondary-foreground',
      destructive: 'text-destructive-foreground',
      outline:     'text-foreground',
      ghost:       'text-foreground',
      tonal:       'text-secondary-foreground',
    },
    size: {
      sm:   'text-sm',
      md:   'text-base',
      lg:   'text-lg',
      icon: 'text-base',
    },
  },
  defaultVariants: { variant: 'default', size: 'md' },
});

type ButtonProps = React.ComponentPropsWithoutRef<typeof Pressable> &
  VariantProps<typeof buttonVariants> & {
    label?: string;
    labelClasses?: string;
  };

function Button({ children, className, variant, size, label, labelClasses, onPress, ...props }: ButtonProps) {
  function handlePress(ev: Parameters<NonNullable<typeof onPress>>[0]) {
    // iOS-style haptic feedback on press
    if (process.env.EXPO_OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onPress?.(ev);
  }

  return (
    <Pressable
      className={cn(buttonVariants({ variant, size }), className)}
      onPress={handlePress}
      {...props}
    >
      {label ? (
        <Text className={cn(buttonTextVariants({ variant, size }), labelClasses)}>
          {label}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
}

export { Button, buttonVariants, buttonTextVariants };
```

### 6.3 Card Component

`components/nativewindui/Card.tsx`:
```tsx
import * as React from 'react';
import { View } from 'react-native';
import { cn } from '~/lib/utils';
import { Text } from './Text';

function Card({ className, ...props }: React.ComponentPropsWithoutRef<typeof View>) {
  return (
    <View
      className={cn('rounded-2xl border border-border bg-card p-4 shadow-sm', className)}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentPropsWithoutRef<typeof View>) {
  return <View className={cn('mb-3', className)} {...props} />;
}

function CardTitle({ className, ...props }: React.ComponentPropsWithoutRef<typeof Text>) {
  return <Text variant="heading" className={cn('text-card-foreground', className)} {...props} />;
}

function CardDescription({ className, ...props }: React.ComponentPropsWithoutRef<typeof Text>) {
  return <Text variant="subhead" color="secondary" className={cn(className)} {...props} />;
}

function CardContent({ className, ...props }: React.ComponentPropsWithoutRef<typeof View>) {
  return <View className={cn(className)} {...props} />;
}

function CardFooter({ className, ...props }: React.ComponentPropsWithoutRef<typeof View>) {
  return <View className={cn('mt-3 flex-row items-center', className)} {...props} />;
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
```

### 6.4 Switch Component — Using rn-primitives

`components/nativewindui/Switch.tsx`:
```tsx
import * as React from 'react';
import * as SwitchPrimitive from '@rn-primitives/switch';
import { cn } from '~/lib/utils';

// rn-primitives provides the accessible, stateful headless base.
// We ONLY add className styling on top.

function Switch({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      className={cn(
        'h-8 w-14 rounded-full border-2 border-transparent',
        'transition-colors duration-200',
        'data-[state=checked]:bg-primary',
        'data-[state=unchecked]:bg-input',
        'disabled:opacity-40',
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          'h-6 w-6 rounded-full bg-background shadow-md',
          'transition-transform duration-200',
          'data-[state=checked]:translate-x-6',
          'data-[state=unchecked]:translate-x-0.5',
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
```

### 6.5 Checkbox Component — Using rn-primitives

`components/nativewindui/Checkbox.tsx`:
```tsx
import * as React from 'react';
import * as CheckboxPrimitive from '@rn-primitives/checkbox';
import { Check } from 'lucide-react-native';
import { cn } from '~/lib/utils';

function Checkbox({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        'h-6 w-6 rounded-md border-2 border-primary',
        'items-center justify-center',
        'data-[state=checked]:bg-primary',
        'disabled:opacity-40',
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="items-center justify-center">
        <Check size={14} strokeWidth={3} className="text-primary-foreground" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
```

### 6.6 Dialog Component — Using rn-primitives

`components/nativewindui/Dialog.tsx`:
```tsx
import * as React from 'react';
import * as DialogPrimitive from '@rn-primitives/dialog';
import { cn } from '~/lib/utils';
import { Text } from './Text';

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogClose = DialogPrimitive.Close;
const DialogPortal = DialogPrimitive.Portal;

function DialogOverlay({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      className={cn(
        'absolute inset-0 z-50 bg-black/60',
        'animate-fade-in',
        className
      )}
      {...props}
    />
  );
}

function DialogContent({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        className={cn(
          'z-50 mx-4 rounded-3xl bg-card p-6',
          'border border-border shadow-xl',
          'animate-scale-in',
          className
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

function DialogTitle({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Text>) {
  return <Text variant="title2" className={cn('mb-1', className)} {...props} />;
}

function DialogDescription({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Text>) {
  return <Text color="secondary" className={cn('mb-4', className)} {...props} />;
}

function DialogFooter({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>) {
  return (
    <DialogPrimitive.Content
      className={cn('mt-4 flex-row justify-end gap-3', className)}
      {...props}
    />
  );
}

export {
  Dialog, DialogTrigger, DialogClose, DialogPortal,
  DialogOverlay, DialogContent, DialogTitle, DialogDescription, DialogFooter,
};
```

### 6.7 Progress — Using rn-primitives

`components/nativewindui/Progress.tsx`:
```tsx
import * as React from 'react';
import * as ProgressPrimitive from '@rn-primitives/progress';
import { cn } from '~/lib/utils';

function Progress({
  className,
  indicatorClassName,
  ...props
}: React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
  indicatorClassName?: string;
}) {
  return (
    <ProgressPrimitive.Root
      className={cn('h-2 w-full overflow-hidden rounded-full bg-secondary', className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn('h-full rounded-full bg-primary transition-all', indicatorClassName)}
        style={{ width: `${props.value ?? 0}%` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
```

### 6.8 Badge Component

`components/nativewindui/Badge.tsx`:
```tsx
import * as React from 'react';
import { View } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '~/lib/utils';
import { Text } from './Text';

const badgeVariants = cva(
  'items-center justify-center rounded-full px-2.5 py-0.5',
  {
    variants: {
      variant: {
        default:     'bg-primary',
        secondary:   'bg-secondary',
        destructive: 'bg-destructive',
        outline:     'border border-border bg-transparent',
      },
    },
    defaultVariants: { variant: 'default' },
  }
);

const badgeTextVariants = cva('text-xs font-semibold', {
  variants: {
    variant: {
      default:     'text-primary-foreground',
      secondary:   'text-secondary-foreground',
      destructive: 'text-destructive-foreground',
      outline:     'text-foreground',
    },
  },
  defaultVariants: { variant: 'default' },
});

type BadgeProps = React.ComponentPropsWithoutRef<typeof View> &
  VariantProps<typeof badgeVariants> & {
    label: string;
    labelClassName?: string;
  };

function Badge({ label, variant, className, labelClassName, ...props }: BadgeProps) {
  return (
    <View className={cn(badgeVariants({ variant }), className)} {...props}>
      <Text className={cn(badgeTextVariants({ variant }), labelClassName)}>
        {label}
      </Text>
    </View>
  );
}

export { Badge, badgeVariants };
```

### 6.9 Barrel Export

`components/nativewindui/index.ts`:
```ts
export * from './Text';
export * from './Button';
export * from './Card';
export * from './Switch';
export * from './Checkbox';
export * from './Dialog';
export * from './Progress';
export * from './Badge';
// Add each new component here as you build it
```

---

## PHASE 7 — TAB LAYOUT & SHOWCASE SCREENS

### 7.1 Tab Layout

`app/(tabs)/_layout.tsx`:
```tsx
import { Tabs } from 'expo-router';
import { Home, Layers } from 'lucide-react-native';

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Components',
          tabBarIcon: ({ color }) => <Layers color={color} size={22} />,
        }}
      />
    </Tabs>
  );
}
```

### 7.2 Component Gallery Screen

`app/(tabs)/index.tsx`:
```tsx
import { ScrollView, View } from 'react-native';
import { Link } from 'expo-router';
import { Text } from '~/components/nativewindui/Text';
import { Separator } from '~/components/nativewindui/Separator';

const COMPONENTS = [
  { title: 'Button',    href: '/button',    description: 'Pressable with variants and haptics' },
  { title: 'Card',      href: '/card',      description: 'Elevated container with header/footer' },
  { title: 'Checkbox',  href: '/checkbox',  description: 'Accessible checkbox via rn-primitives' },
  { title: 'Dialog',    href: '/dialog',    description: 'Modal dialog with overlay' },
  { title: 'Progress',  href: '/progress',  description: 'Progress indicator bar' },
  { title: 'Switch',    href: '/switch',    description: 'iOS-style toggle switch' },
  { title: 'Badge',     href: '/badge',     description: 'Status labels and tags' },
];

export default function ComponentsScreen() {
  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerClassName="py-4"
    >
      {COMPONENTS.map((comp, i) => (
        <View key={comp.title}>
          <Link href={comp.href as any} asChild>
            <View className="flex-row items-center justify-between px-4 py-3 active:bg-muted">
              <View>
                <Text variant="heading">{comp.title}</Text>
                <Text variant="subhead" color="secondary">{comp.description}</Text>
              </View>
              <Text color="secondary">›</Text>
            </View>
          </Link>
          {i < COMPONENTS.length - 1 && <Separator className="ml-4" />}
        </View>
      ))}
    </ScrollView>
  );
}
```

### 7.3 Button Demo Screen

`app/button.tsx`:
```tsx
import { ScrollView, View } from 'react-native';
import { Stack } from 'expo-router';
import { Button } from '~/components/nativewindui/Button';
import { Text } from '~/components/nativewindui/Text';

export default function ButtonScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Button' }} />
      <ScrollView className="flex-1 bg-background" contentContainerClassName="p-4 gap-4">

        <Text variant="title3">Variants</Text>
        <Button label="Default"      variant="default"     />
        <Button label="Secondary"    variant="secondary"   />
        <Button label="Destructive"  variant="destructive" />
        <Button label="Outline"      variant="outline"     />
        <Button label="Ghost"        variant="ghost"       />

        <Text variant="title3" className="mt-4">Sizes</Text>
        <Button label="Small"  size="sm" />
        <Button label="Medium" size="md" />
        <Button label="Large"  size="lg" />

      </ScrollView>
    </>
  );
}
```

---

## PHASE 8 — RUNNING THE APP

```bash
# Start dev server (choose platform)
npx expo start

# Press i → iOS Simulator
# Press a → Android Emulator
# Press w → Web browser

# Run specifically
npx expo run:ios
npx expo run:android
npx expo start --web
```

---

## PHASE 9 — DEPLOYING

NativeWindUI uses **two different deployment targets** depending on platform:

### 9.1 Web → Vercel

```bash
# Build web output
npx expo export --platform web
# Output: /dist folder

# Deploy to Vercel
npm install -g vercel
vercel login
vercel --prod
```

`vercel.json`:
```json
{
  "buildCommand": "npx expo export --platform web",
  "outputDirectory": "dist",
  "framework": null,
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

### 9.2 iOS + Android → EAS Build (Expo Application Services)

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo account
eas login

# Configure EAS for your project
eas build:configure
```

`eas.json` (generated, but here's the key config):
```json
{
  "cli": { "version": ">= 12.0.0" },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {
      "autoIncrement": true
    }
  },
  "submit": {
    "production": {}
  }
}
```

```bash
# Build for iOS (TestFlight / App Store)
eas build --platform ios --profile production

# Build for Android (Play Store)
eas build --platform android --profile production

# Build for both
eas build --platform all --profile production

# Submit to stores
eas submit --platform ios
eas submit --platform android
```

---

## PHASE 10 — CI/CD (GitHub Actions)

`.github/workflows/deploy.yml`:
```yaml
name: CI/CD

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  # ── TYPE CHECK + LINT ─────────────────────────────
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci
      - run: npx tsc --noEmit
      - run: npx expo lint

  # ── WEB → VERCEL ─────────────────────────────────
  deploy-web:
    needs: check
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci
      - run: npx expo export --platform web
      - run: npx vercel deploy --prod --token=${{ secrets.VERCEL_TOKEN }}
        env:
          VERCEL_ORG_ID:     ${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}

  # ── NATIVE → EAS ─────────────────────────────────
  deploy-native:
    needs: check
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci
      - run: npm install -g eas-cli
      - run: eas build --platform all --profile production --non-interactive
        env:
          EXPO_TOKEN: ${{ secrets.EXPO_TOKEN }}
```

---

## PHASE 11 — AGENT COMMANDS

### 🤖 AGENT 1 — Scaffold Agent

```
You are a project scaffolding agent. Build an exact clone of NativeWindUI.

Real stack: Expo + Expo Router + NativeWind v4 + rn-primitives + TypeScript.
This is NOT a Next.js project. It is a pure Expo app using React Native primitives.

Run these commands in order. Stop and report any error before continuing.

1. npx create-expo-app@latest my-ui --template blank-typescript
2. cd my-ui
3. Update package.json: change "main" field to "expo-router/entry"
4. npx expo install expo-router expo-constants expo-linking expo-status-bar
5. npx expo install nativewind tailwindcss
6. npx expo install react-native-reanimated react-native-safe-area-context
7. npx expo install @rn-primitives/dialog @rn-primitives/tabs @rn-primitives/switch @rn-primitives/checkbox @rn-primitives/select @rn-primitives/progress @rn-primitives/avatar @rn-primitives/separator @rn-primitives/label @rn-primitives/types @rn-primitives/hooks
8. npx expo install lucide-react-native react-native-svg expo-haptics expo-image expo-font
9. npm install class-variance-authority clsx tailwind-merge
10. Create global.css with Tailwind directives + CSS variables for light/dark theme
11. Create tailwind.config.js with nativewind/preset and CSS variable color mappings
12. Create metro.config.js using withNativeWind wrapper pointing to global.css
13. Create babel.config.js with jsxImportSource: 'nativewind' and reanimated plugin LAST
14. Create nativewind-env.d.ts referencing nativewind/types
15. Update app.json: add expo-router plugin, typedRoutes experiment, web static output
16. Create folder structure: app/, app/(tabs)/, components/nativewindui/, lib/, theme/
17. Create lib/utils.ts with cn() helper
18. Create lib/useColorScheme.ts
19. Create theme/colors.ts with NAV_THEME for light and dark
20. Create app/_layout.tsx as root layout with ThemeProvider
21. Create components/nativewindui/index.ts as empty barrel export

After completing all steps, run: npx expo start --web
Verify it loads without errors. Report every file created.
```

---

### 🤖 AGENT 2 — Component Builder Agent

```
You are a React Native component builder agent for a NativeWindUI clone.

CRITICAL RULES — break these and the components won't work:
- NEVER use HTML elements (div, span, button, p, h1-h6)
- ONLY use React Native primitives: View, Text, Pressable, ScrollView, Image, FlatList
- Use NativeWind className props for ALL styling — no StyleSheet.create(), no inline style objects
- Use rn-primitives (@rn-primitives/xxx) as the headless base for complex interactive components
- Use CVA (class-variance-authority) for variant systems
- Every component must use the cn() helper from ~/lib/utils for className merging
- Import path alias is ~/ (maps to project root)
- All components go in components/nativewindui/

Build these components in order. Output the COMPLETE file for each:

1. components/nativewindui/Text.tsx
   - CVA variants: largeTitle, title1, title2, title3, heading, body, callout, subhead, footnote, caption1, caption2
   - Color variants: primary (text-foreground), secondary (text-muted-foreground), destructive
   - Wraps React Native <Text>

2. components/nativewindui/Button.tsx
   - Variants: default (bg-primary), secondary, destructive, outline, ghost
   - Sizes: sm (h-9), md (h-11), lg (h-14), icon (h-11 w-11 rounded-full)
   - Props: label, labelClasses, size, variant
   - Calls expo-haptics on press (iOS only, check process.env.EXPO_OS)

3. components/nativewindui/Card.tsx
   - Sub-components: Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
   - Style: rounded-2xl border border-border bg-card shadow-sm

4. components/nativewindui/Switch.tsx
   - Base: @rn-primitives/switch (Root + Thumb)
   - Styled with: bg-primary when checked, bg-input when unchecked, smooth thumb translate

5. components/nativewindui/Checkbox.tsx
   - Base: @rn-primitives/checkbox (Root + Indicator)
   - Shows lucide-react-native Check icon when checked

6. components/nativewindui/Badge.tsx
   - Variants: default, secondary, destructive, outline
   - Props: label, variant, labelClassName

7. components/nativewindui/Progress.tsx
   - Base: @rn-primitives/progress (Root + Indicator)
   - Indicator width driven by value prop as percentage

8. components/nativewindui/Separator.tsx
   - Base: @rn-primitives/separator
   - Thin horizontal line, uses border-border color
   - orientation prop: horizontal | vertical

9. components/nativewindui/Avatar.tsx
   - Base: @rn-primitives/avatar (Root + Image + Fallback)
   - Fallback shows initials text
   - Sizes: sm, md, lg

10. components/nativewindui/Dialog.tsx
    - Base: @rn-primitives/dialog
    - Sub-components: Dialog, DialogTrigger, DialogClose, DialogPortal, DialogOverlay, DialogContent, DialogTitle, DialogDescription, DialogFooter
    - Overlay: bg-black/60 blur
    - Content: rounded-3xl bg-card p-6 shadow-xl

After all components are built, update components/nativewindui/index.ts with all exports.
```

---

### 🤖 AGENT 3 — Screen Builder Agent

```
You are a screen builder agent for a NativeWindUI-clone Expo app.

Stack: Expo Router (file-based routing) + React Native + NativeWind + TypeScript
Components are at ~/components/nativewindui/
Route alias ~ maps to project root

Build these files:

1. app/(tabs)/_layout.tsx
   Tab bar with one tab: "Components" using Layers icon from lucide-react-native

2. app/(tabs)/index.tsx
   Scrollable list of all components using Link from expo-router
   Each row: component name (Text variant="heading") + description (Text color="secondary")
   Separated by Separator component
   Items: Button, Card, Checkbox, Dialog, Progress, Switch, Badge, Avatar

3. app/button.tsx
   Stack.Screen with title "Button"
   Shows all variants stacked vertically
   Shows all sizes
   Each has a label

4. app/card.tsx
   Shows a Card with CardHeader, CardTitle, CardDescription, CardContent
   Shows a second Card with CardFooter containing two Button components

5. app/switch.tsx
   Shows Switch with label, demonstrates controlled state with useState

6. app/checkbox.tsx
   Shows multiple Checkbox items in a list, each with a label

7. app/dialog.tsx
   DialogTrigger Button that opens a Dialog
   Dialog has title, description, cancel and confirm buttons

8. app/progress.tsx
   Shows Progress at 0%, 33%, 66%, 100%
   Add a Button that animates progress from 0 to 100 using setInterval

RULES:
- NEVER use HTML elements — only RN primitives and components from ~/components/nativewindui/
- All screens are ScrollView-based with bg-background
- Use Stack.Screen for screen headers
- Use className for all styling via NativeWind
```

---

### 🤖 AGENT 4 — Build & Deploy Agent

```
You are a build and deployment agent for an Expo + NativeWind component library.

Two deployment targets: Web (Vercel) and Native (EAS).

Execute in order. Stop on any failure.

STEP 1 — Type check:
  npx tsc --noEmit
  Expected: 0 errors

STEP 2 — Lint:
  npx expo lint
  Expected: 0 errors

STEP 3 — Web build:
  npx expo export --platform web
  Expected: /dist folder created with index.html

STEP 4 — Verify web build:
  ls dist/ | grep index.html
  Expected: index.html present

STEP 5 — Serve locally:
  npx serve dist/ -p 4000 &
  sleep 3
  curl -s -o /dev/null -w "HTTP: %{http_code}" http://localhost:4000
  Expected: HTTP: 200

STEP 6 — Deploy to Vercel (web):
  npx vercel deploy --prod --token=$VERCEL_TOKEN
  Expected: Production URL returned

STEP 7 — Verify vercel.json has SPA rewrite:
  cat vercel.json | grep '"destination": "/"'
  Expected: Match found (critical for Expo Router SPA mode)

STEP 8 — EAS native build (run only if EXPO_TOKEN is set):
  eas build --platform all --profile production --non-interactive
  Expected: Build queued on EAS servers. Returns build IDs.

Report: web URL, EAS build IDs, any warnings.
```

---

### 🤖 AGENT 5 — New Component Agent (repeatable)

**Use for every new component you add:**

```
You are adding a new component to a NativeWindUI clone.

Existing stack: Expo + Expo Router + NativeWind v4 + rn-primitives + CVA + TypeScript
Component folder: components/nativewindui/
Import alias: ~/

New component: [COMPONENT_NAME]
rn-primitive to use (if any): @rn-primitives/[primitive-name]
Description: [WHAT IT DOES]
Props: [LIST PROPS]
Variants: [LIST VARIANTS]

Deliver these 4 files completely:

1. components/nativewindui/[ComponentName].tsx
   - Use @rn-primitives/[x] as the headless base if applicable
   - Only NativeWind className for styling (no StyleSheet.create)
   - CVA for variant system
   - cn() from ~/lib/utils

2. The export line to add to components/nativewindui/index.ts

3. app/[component-name].tsx
   - Demo screen using Stack.Screen for the header
   - Shows all variants/states interactively

4. The route entry to add to app/(tabs)/index.tsx component list

Output all 4 items with COMPLETE file contents.
```

---

## QUICK REFERENCE

```bash
# ── DEV ─────────────────────────────────────────────
npx expo start            # Interactive menu (i/a/w)
npx expo start --ios      # iOS simulator
npx expo start --android  # Android emulator
npx expo start --web      # Web browser

# ── BUILD ────────────────────────────────────────────
npx expo export --platform web    # Web → /dist
npx expo run:ios                  # Native iOS build
npx expo run:android              # Native Android build

# ── EAS (PRODUCTION NATIVE) ──────────────────────────
eas build --platform ios     --profile production
eas build --platform android --profile production
eas build --platform all     --profile production
eas submit --platform ios
eas submit --platform android

# ── WEB DEPLOY ───────────────────────────────────────
vercel              # Preview deploy
vercel --prod       # Production deploy
vercel env pull     # Pull env vars locally

# ── CHECKS ───────────────────────────────────────────
npx tsc --noEmit    # Type check
npx expo lint       # Lint
npx expo-doctor     # Project health check
```

---

## TROUBLESHOOTING

| Problem | Cause | Fix |
|---|---|---|
| `className` prop has no effect | NativeWind not configured | Check babel.config.js has `jsxImportSource: 'nativewind'` |
| `global.css` not found | Wrong metro config | Ensure `withNativeWind(config, { input: './global.css' })` |
| Reanimated warning on start | Plugin order wrong | `react-native-reanimated/plugin` must be LAST in babel plugins |
| rn-primitives import error | Not installed | Run `npx expo install @rn-primitives/[name]` |
| Web: white screen after deploy | Missing SPA rewrite | Add `{ "source": "/(.*)", "destination": "/" }` to vercel.json rewrites |
| `Cannot find module 'expo-router/entry'` | Wrong package.json main | Set `"main": "expo-router/entry"` |
| Dark mode CSS vars not applying | Missing global.css import | Add `import '~/global.css'` to app/_layout.tsx (first import) |
| lucide icons not rendering | Missing react-native-svg | `npx expo install react-native-svg` |
| Haptics crash on Android | Platform not checked | Wrap haptics in `if (process.env.EXPO_OS === 'ios')` |
| EAS build fails | Not logged in | Run `eas login` with your Expo account |
```
