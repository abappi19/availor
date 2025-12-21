import React from 'react';
import { ActivityIndicator, View, ViewStyle } from 'react-native';

export type SpinnerSize = 'small' | 'large';

export interface SpinnerProps {
  size?: SpinnerSize;
  color?: string;
  style?: ViewStyle;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'small',
  color = '#2196F3',
  style,
}) => {
  return (
    <View style={style}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

