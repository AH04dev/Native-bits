import * as React from 'react';
import { View, Pressable, GestureResponderEvent, LayoutChangeEvent } from 'react-native';
import { cn } from '~/lib/utils';

type SliderProps = {
    value?: number;
    min?: number;
    max?: number;
    step?: number;
    onValueChange?: (value: number) => void;
    className?: string;
    trackClassName?: string;
    thumbClassName?: string;
    disabled?: boolean;
};

function Slider({
    value = 0,
    min = 0,
    max = 100,
    step = 1,
    onValueChange,
    className,
    trackClassName,
    thumbClassName,
    disabled = false,
}: SliderProps) {
    const [trackWidth, setTrackWidth] = React.useState(0);

    const percentage = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));

    function handleLayout(e: LayoutChangeEvent) {
        setTrackWidth(e.nativeEvent.layout.width);
    }

    function handlePress(e: GestureResponderEvent) {
        if (disabled || !trackWidth) return;
        const x = e.nativeEvent.locationX;
        const ratio = Math.max(0, Math.min(1, x / trackWidth));
        const raw = min + ratio * (max - min);
        const stepped = Math.round(raw / step) * step;
        onValueChange?.(Math.min(max, Math.max(min, stepped)));
    }

    return (
        <Pressable
            onPress={handlePress}
            onLayout={handleLayout}
            disabled={disabled}
            className={cn('w-full justify-center py-2', disabled && 'opacity-40', className)}
        >
            {/* Track */}
            <View className={cn('h-2 w-full overflow-hidden rounded-full bg-secondary', trackClassName)}>
                {/* Fill */}
                <View
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${percentage}%` }}
                />
            </View>
            {/* Thumb */}
            <View
                className={cn(
                    'absolute h-5 w-5 rounded-full border-2 border-primary bg-background shadow-md',
                    thumbClassName,
                )}
                style={{ left: `${percentage}%`, marginLeft: -10 }}
            />
        </Pressable>
    );
}

export { Slider };
export type { SliderProps };
