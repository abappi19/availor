import React from 'react';
import { View, ViewStyle } from 'react-native';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  style?: ViewStyle;
}

export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  className = '',
  style,
}) => {
  const baseClasses = 'bg-gray-200';
  const orientationClasses = orientation === 'horizontal' ? 'h-px w-full' : 'w-px h-full';

  return <View className={`${baseClasses} ${orientationClasses} ${className}`} style={style} />;
};

