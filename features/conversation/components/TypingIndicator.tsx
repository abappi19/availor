import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
} from 'react-native-reanimated';

export const TypingIndicator: React.FC = () => {
  const dot1 = useSharedValue(0);
  const dot2 = useSharedValue(0);
  const dot3 = useSharedValue(0);

  useEffect(() => {
    // Animate dots with staggered timing
    dot1.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 400 }),
        withTiming(0, { duration: 400 })
      ),
      -1,
      false
    );

    dot2.value = withDelay(
      150,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 400 }),
          withTiming(0, { duration: 400 })
        ),
        -1,
        false
      )
    );

    dot3.value = withDelay(
      300,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 400 }),
          withTiming(0, { duration: 400 })
        ),
        -1,
        false
      )
    );
  }, []);

  const dot1Style = useAnimatedStyle(() => ({
    opacity: 0.3 + dot1.value * 0.7,
  }));

  const dot2Style = useAnimatedStyle(() => ({
    opacity: 0.3 + dot2.value * 0.7,
  }));

  const dot3Style = useAnimatedStyle(() => ({
    opacity: 0.3 + dot3.value * 0.7,
  }));

  return (
    <View className="flex-row mb-4">
      <View className="w-10 h-10 rounded-full bg-primary-100 items-center justify-center mr-3">
        <View className="w-6 h-6 rounded-full bg-primary-500" />
      </View>

      <View className="bg-white rounded-2xl rounded-tl-sm px-6 py-4 shadow-md">
        <View className="flex-row gap-2">
          <Animated.View
            className="w-2 h-2 rounded-full bg-gray-400"
            style={dot1Style}
          />
          <Animated.View
            className="w-2 h-2 rounded-full bg-gray-400"
            style={dot2Style}
          />
          <Animated.View
            className="w-2 h-2 rounded-full bg-gray-400"
            style={dot3Style}
          />
        </View>
      </View>
    </View>
  );
};

