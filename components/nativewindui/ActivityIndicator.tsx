import * as React from 'react';
import { ActivityIndicator as RNActivityIndicator } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '~/lib/utils';

const activityIndicatorVariants = cva('', {
    variants: {
        size: {
            sm: '',
            md: '',
            lg: '',
        },
    },
    defaultVariants: {
        size: 'md',
    },
});

const SIZE_MAP = {
    sm: 'small' as const,
    md: 'small' as const,
    lg: 'large' as const,
};

type ActivityIndicatorProps = Omit<
    React.ComponentPropsWithoutRef<typeof RNActivityIndicator>,
    'size'
> &
    VariantProps<typeof activityIndicatorVariants>;

function ActivityIndicator({
    className,
    size = 'md',
    color,
    ...props
}: ActivityIndicatorProps) {
    return (
        <RNActivityIndicator
            className={cn(activityIndicatorVariants({ size }), className)}
            size={SIZE_MAP[size ?? 'md']}
            color={color ?? 'hsl(240, 5.9%, 10%)'}
            {...props}
        />
    );
}

export { ActivityIndicator, activityIndicatorVariants };
