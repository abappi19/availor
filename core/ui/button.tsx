import type { ReactNode } from 'react';
import { Pressable, type PressableProps, Text } from 'react-native';

export interface ButtonProps extends Omit<PressableProps, 'children'> {
    className?: string;
    variant?: 'solid' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    children: ReactNode;
    isLoading?: boolean;
    isDisabled?: boolean;
}

const variantStyles: Record<string, string> = {
    solid: 'bg-primary-500 active:bg-primary-600',
    outline: 'border-2 border-primary-500 bg-transparent active:bg-primary-50 dark:active:bg-primary-900',
    ghost: 'bg-transparent active:bg-gray-100 dark:active:bg-gray-800',
};

const sizeStyles: Record<string, string> = {
    sm: 'px-3 py-1.5 rounded-lg',
    md: 'px-4 py-2.5 rounded-xl',
    lg: 'px-6 py-3.5 rounded-xl',
};

const textVariantStyles: Record<string, string> = {
    solid: 'text-white',
    outline: 'text-primary-500',
    ghost: 'text-primary-500',
};

const textSizeStyles: Record<string, string> = {
    sm: 'text-sm font-medium',
    md: 'text-base font-semibold',
    lg: 'text-lg font-semibold',
};

export function Button({
    className = '',
    variant = 'solid',
    size = 'md',
    children,
    isLoading,
    isDisabled,
    ...props
}: ButtonProps) {
    const disabled = isDisabled || isLoading;
    const baseClass = `items-center justify-center ${variantStyles[variant]} ${sizeStyles[size]} ${disabled ? 'opacity-50' : ''}`;

    return (
        <Pressable className={`${baseClass} ${className}`} disabled={disabled} {...props}>
            {typeof children === 'string' ? (
                <Text className={`${textVariantStyles[variant]} ${textSizeStyles[size]}`}>
                    {isLoading ? 'Loading...' : children}
                </Text>
            ) : (
                children
            )}
        </Pressable>
    );
}

export function ButtonText({ className = '', children }: { className?: string; children: ReactNode }) {
    return <Text className={`font-semibold ${className}`}>{children}</Text>;
}
