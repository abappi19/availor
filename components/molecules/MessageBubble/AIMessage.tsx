import React from 'react';
import { View, Text } from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

export interface AIMessageProps {
  message: string;
  timestamp?: number;
}

const AnimatedView = Animated.createAnimatedComponent(View);

export const AIMessage: React.FC<AIMessageProps> = ({ message, timestamp }) => {
  return (
    <AnimatedView entering={FadeInRight.duration(300)} className="flex-row mb-4">
      {/* AI Avatar */}
      <View className="w-10 h-10 rounded-full items-center justify-center mr-3 overflow-hidden">
        <LinearGradient
          colors={['#2196F3', '#7B1FA2']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="w-full h-full items-center justify-center"
        >
          <Text className="text-white font-bold text-lg">AI</Text>
        </LinearGradient>
      </View>

      {/* Message Bubble */}
      <View className="flex-1 max-w-[75%]">
        <View className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-md">
          <Text className="text-gray-900 text-base leading-relaxed">{message}</Text>
          {timestamp && (
            <Text className="text-gray-500 text-xs mt-1">
              {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          )}
        </View>
      </View>
    </AnimatedView>
  );
};

