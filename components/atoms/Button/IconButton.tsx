import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, type ViewStyle } from 'react-native';

export type IconButtonVariant = 'solid' | 'outline' | 'ghost';
export type IconButtonSize = 'sm' | 'md' | 'lg';

export interface IconButtonProps {
    icon: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
    variant?: IconButtonVariant;
    size?: IconButtonSize;
    color?: string;
    disabled?: boolean;
    style?: ViewStyle;
}

export const IconButton: React.FC<IconButtonProps> = ({
    icon,
    onPress,
    variant = 'ghost',
    size = 'md',
    color = '#2196F3',
    disabled = false,
    style,
}) => {
    const getVariantClasses = () => {
        const baseClasses = 'rounded-full items-center justify-center';

        const variantClasses = {
            solid: 'bg-primary-500 active:bg-primary-600',
            outline: 'border-2 border-primary-500 bg-transparent active:bg-primary-50',
            ghost: 'bg-transparent active:bg-gray-100',
        };

        const disabledClasses = disabled ? 'opacity-50' : '';

        return `${baseClasses} ${variantClasses[variant]} ${disabledClasses}`;
    };

    const getSizeClasses = () => {
        const sizeClasses = {
            sm: 'p-2',
            md: 'p-3',
            lg: 'p-4',
        };
        return sizeClasses[size];
    };

    const getIconSize = () => {
        const iconSizes = {
            sm: 16,
            md: 24,
            lg: 32,
        };
        return iconSizes[size];
    };

    const getIconColor = () => {
        if (variant === 'solid') return '#FFFFFF';
        return color;
    };

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            className={`${getVariantClasses()} ${getSizeClasses()}`}
            style={style}
            activeOpacity={0.7}
        >
            <Ionicons name={icon} size={getIconSize()} color={getIconColor()} />
        </TouchableOpacity>
    );
};
