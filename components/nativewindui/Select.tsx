import * as React from 'react';
import { View, Pressable } from 'react-native';
import { cn } from '~/lib/utils';
import { Text } from './Text';
import { ChevronDown } from 'lucide-react-native';

type SelectOption = {
    label: string;
    value: string;
};

type SelectProps = {
    options: SelectOption[];
    value?: string;
    onValueChange?: (value: string) => void;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
};

function Select({
    options,
    value,
    onValueChange,
    placeholder = 'Select an option…',
    className,
    disabled = false,
}: SelectProps) {
    const [open, setOpen] = React.useState(false);
    const selectedOption = options.find((o) => o.value === value);

    return (
        <View className={cn('relative', className)}>
            {/* Trigger */}
            <Pressable
                disabled={disabled}
                onPress={() => setOpen(!open)}
                className={cn(
                    'flex-row items-center justify-between rounded-xl border border-input bg-background px-4 py-3',
                    'active:bg-muted',
                    disabled && 'opacity-40',
                )}
            >
                <Text
                    className={cn(
                        selectedOption ? 'text-foreground' : 'text-muted-foreground',
                    )}
                >
                    {selectedOption?.label ?? placeholder}
                </Text>
                <ChevronDown
                    size={16}
                    className="text-muted-foreground"
                    color="hsl(240, 5%, 65%)"
                />
            </Pressable>

            {/* Dropdown Content */}
            {open && (
                <View className="absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-xl border border-border bg-card shadow-lg">
                    {options.map((option) => (
                        <Pressable
                            key={option.value}
                            onPress={() => {
                                onValueChange?.(option.value);
                                setOpen(false);
                            }}
                            className={cn(
                                'px-4 py-3 active:bg-muted',
                                option.value === value && 'bg-secondary',
                            )}
                        >
                            <Text
                                className={cn(
                                    option.value === value
                                        ? 'font-semibold text-foreground'
                                        : 'text-foreground',
                                )}
                            >
                                {option.label}
                            </Text>
                        </Pressable>
                    ))}
                </View>
            )}
        </View>
    );
}

export { Select };
export type { SelectOption, SelectProps };
