import { View, Text } from 'react-native';

export interface BadgeProps {
    className?: string;
    children: string;
    variant?: 'solid' | 'outline';
    colorScheme?: 'primary' | 'success' | 'warning' | 'error' | 'gray';
    size?: 'sm' | 'md' | 'lg';
}

const colorStyles: Record<string, { solid: string; outline: string; text: string }> = {
    primary: {
        solid: 'bg-primary-500',
        outline: 'border border-primary-500 bg-transparent',
        text: 'text-white',
    },
    success: {
        solid: 'bg-success-500',
        outline: 'border border-success-500 bg-transparent',
        text: 'text-white',
    },
    warning: {
        solid: 'bg-warning-500',
        outline: 'border border-warning-500 bg-transparent',
        text: 'text-white',
    },
    error: {
        solid: 'bg-error-500',
        outline: 'border border-error-500 bg-transparent',
        text: 'text-white',
    },
    gray: {
        solid: 'bg-gray-500',
        outline: 'border border-gray-500 bg-transparent',
        text: 'text-white',
    },
};

const sizeStyles: Record<string, { container: string; text: string }> = {
    sm: { container: 'px-2 py-0.5 rounded', text: 'text-xs' },
    md: { container: 'px-2.5 py-1 rounded-md', text: 'text-sm' },
    lg: { container: 'px-3 py-1.5 rounded-lg', text: 'text-base' },
};

export function Badge({
    className = '',
    children,
    variant = 'solid',
    colorScheme = 'primary',
    size = 'md',
}: BadgeProps) {
    const colors = colorStyles[colorScheme];
    const sizes = sizeStyles[size];
    const bgClass = variant === 'solid' ? colors.solid : colors.outline;
    const textClass = variant === 'solid' ? colors.text : `text-${colorScheme}-500`;

    return (
        <View className={`${bgClass} ${sizes.container} ${className}`}>
            <Text className={`font-medium ${sizes.text} ${textClass}`}>{children}</Text>
        </View>
    );
}
