import React from 'react';
import { View, Text } from 'react-native';
import Animated, { FadeInLeft } from 'react-native-reanimated';

export interface UserMessageProps {
  message: string;
  timestamp?: number;
}

const AnimatedView = Animated.createAnimatedComponent(View);

export const UserMessage: React.FC<UserMessageProps> = ({ message, timestamp }) => {
  return (
    <AnimatedView entering={FadeInLeft.duration(300)} className="flex-row justify-end mb-4">
      <View className="max-w-[80%] bg-primary-500 rounded-2xl rounded-tr-sm px-4 py-3 shadow-md">
        <Text className="text-white text-base leading-relaxed">{message}</Text>
        {timestamp && (
          <Text className="text-white text-xs opacity-70 mt-1">
            {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        )}
      </View>
    </AnimatedView>
  );
};

