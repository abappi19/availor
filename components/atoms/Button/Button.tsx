import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, type ViewStyle } from 'react-native';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
    children: React.ReactNode;
    onPress: () => void;
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
    loading?: boolean;
    fullWidth?: boolean;
    style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    onPress,
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    fullWidth = false,
    style,
}) => {
    const getVariantClasses = () => {
        const baseClasses = 'rounded-xl items-center justify-center flex-row';

        const variantClasses = {
            primary: 'bg-primary-500 active:bg-primary-600',
            secondary: 'bg-gray-100 active:bg-gray-200',
            outline: 'border-2 border-primary-500 bg-transparent active:bg-primary-50',
            ghost: 'bg-transparent active:bg-gray-100',
            danger: 'bg-error-500 active:bg-error-600',
        };

        const disabledClasses = disabled ? 'opacity-50' : '';
        const widthClasses = fullWidth ? 'w-full' : '';

        return `${baseClasses} ${variantClasses[variant]} ${disabledClasses} ${widthClasses}`;
    };

    const getSizeClasses = () => {
        const sizeClasses = {
            sm: 'px-4 py-2',
            md: 'px-6 py-3',
            lg: 'px-8 py-4',
        };
        return sizeClasses[size];
    };

    const getTextClasses = () => {
        const baseTextClasses = 'font-semibold';

        const variantTextClasses = {
            primary: 'text-white',
            secondary: 'text-gray-900',
            outline: 'text-primary-500',
            ghost: 'text-primary-500',
            danger: 'text-white',
        };

        const sizeTextClasses = {
            sm: 'text-sm',
            md: 'text-base',
            lg: 'text-lg',
        };

        return `${baseTextClasses} ${variantTextClasses[variant]} ${sizeTextClasses[size]}`;
    };

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled || loading}
            className={`${getVariantClasses()} ${getSizeClasses()}`}
            style={style}
            activeOpacity={0.7}
        >
            {loading ? (
                <ActivityIndicator
                    size="small"
                    color={variant === 'primary' || variant === 'danger' ? '#FFFFFF' : '#2196F3'}
                />
            ) : (
                <Text className={getTextClasses()}>{children}</Text>
            )}
        </TouchableOpacity>
    );
};
