import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ViewStyle } from 'react-native';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface IconProps {
  name: keyof typeof Ionicons.glyphMap;
  size?: IconSize;
  color?: string;
  style?: ViewStyle;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 'md',
  color = '#2196F3',
  style,
}) => {
  const getSizeValue = () => {
    const sizeMap = {
      xs: 12,
      sm: 16,
      md: 24,
      lg: 32,
      xl: 48,
    };
    return sizeMap[size];
  };

  return <Ionicons name={name} size={getSizeValue()} color={color} style={style} />;
};

