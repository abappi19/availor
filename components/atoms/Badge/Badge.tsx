import React from 'react';
import { View, Text, ViewStyle } from 'react-native';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'gold' | 'silver' | 'bronze';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  style?: ViewStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'default',
  size = 'md',
  style,
}) => {
  const getVariantClasses = () => {
    const variantClasses = {
      default: 'bg-gray-100 border-gray-300',
      success: 'bg-success-100 border-success-500',
      warning: 'bg-warning-100 border-warning-500',
      error: 'bg-error-100 border-error-500',
      gold: 'bg-yellow-100 border-yellow-500',
      silver: 'bg-gray-200 border-gray-400',
      bronze: 'bg-orange-200 border-orange-600',
    };
    return variantClasses[variant];
  };

  const getSizeClasses = () => {
    const sizeClasses = {
      sm: 'px-2 py-1',
      md: 'px-3 py-1.5',
      lg: 'px-4 py-2',
    };
    return sizeClasses[size];
  };

  const getTextClasses = () => {
    const baseTextClasses = 'text-gray-800 font-semibold';
    const sizeTextClasses = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    };
    return `${baseTextClasses} ${sizeTextClasses[size]}`;
  };

  return (
    <View 
      className={`rounded-full border-2 ${getVariantClasses()} ${getSizeClasses()}`}
      style={style}
    >
      <Text className={getTextClasses()}>{label}</Text>
    </View>
  );
};

