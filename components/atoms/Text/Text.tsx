import React from 'react';
import { Text as RNText, TextStyle } from 'react-native';

export type TextVariant = 'body' | 'caption' | 'label';
export type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold';

export interface TextProps {
  children: React.ReactNode;
  variant?: TextVariant;
  size?: TextSize;
  weight?: TextWeight;
  color?: string;
  className?: string;
  style?: TextStyle;
}

export const Text: React.FC<TextProps> = ({
  children,
  variant = 'body',
  size = 'md',
  weight = 'regular',
  color,
  className = '',
  style,
}) => {
  const getVariantClasses = () => {
    const variantClasses = {
      body: 'text-gray-900',
      caption: 'text-gray-600',
      label: 'text-gray-700',
    };
    return variantClasses[variant];
  };

  const getSizeClasses = () => {
    const sizeClasses = {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    };
    return sizeClasses[size];
  };

  const getWeightClasses = () => {
    const weightClasses = {
      regular: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    };
    return weightClasses[weight];
  };

  return (
    <RNText
      className={`${getVariantClasses()} ${getSizeClasses()} ${getWeightClasses()} ${className}`}
      style={[color ? { color } : {}, style]}
    >
      {children}
    </RNText>
  );
};

