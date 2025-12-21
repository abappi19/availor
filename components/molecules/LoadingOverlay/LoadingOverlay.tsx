/**
 * LoadingOverlay Component
 * Full-screen overlay with loading indicator
 */

import React from 'react';
import { View, Text, ActivityIndicator, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn } from 'react-native-reanimated';

export interface LoadingOverlayProps {
  visible: boolean;
  message?: string;
  gradient?: boolean;
}

const AnimatedView = Animated.createAnimatedComponent(View);

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  visible,
  message = 'Loading...',
  gradient = true,
}) => {
  if (!visible) return null;

  return (
    <Modal
      transparent
      visible={visible}
      statusBarTranslucent
      animationType="fade"
    >
      <View className="flex-1 bg-black/50 items-center justify-center">
        <AnimatedView 
          entering={FadeIn.duration(300)}
          className="w-48 rounded-2xl overflow-hidden shadow-2xl"
        >
          {gradient ? (
            <LinearGradient
              colors={['#2196F3', '#7B1FA2']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="p-8 items-center"
            >
              <ActivityIndicator size="large" color="white" />
              <Text className="text-white text-center mt-4 font-medium">
                {message}
              </Text>
            </LinearGradient>
          ) : (
            <View className="bg-white p-8 items-center">
              <ActivityIndicator size="large" color="#2196F3" />
              <Text className="text-gray-900 text-center mt-4 font-medium">
                {message}
              </Text>
            </View>
          )}
        </AnimatedView>
      </View>
    </Modal>
  );
};

