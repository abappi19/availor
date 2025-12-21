import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

export type LevelBadgeSize = 'sm' | 'md' | 'lg';

export interface LevelBadgeProps {
  level: number;
  currentXP: number;
  nextLevelXP: number;
  size?: LevelBadgeSize;
}

export const LevelBadge: React.FC<LevelBadgeProps> = ({
  level,
  currentXP,
  nextLevelXP,
  size = 'md',
}) => {
  const progress = (currentXP / nextLevelXP) * 100;
  const progressValue = useSharedValue(0);

  useEffect(() => {
    progressValue.value = withSpring(progress);
  }, [progress]);

  const sizes = {
    sm: { container: 60, text: 'text-lg', progress: 'h-2', width: 'w-20' },
    md: { container: 80, text: 'text-2xl', progress: 'h-3', width: 'w-24' },
    lg: { container: 100, text: 'text-3xl', progress: 'h-4', width: 'w-32' },
  };

  const animatedWidth = useAnimatedStyle(() => ({
    width: `${progressValue.value}%`,
  }));

  return (
    <View className="items-center">
      {/* Level circle */}
      <View
        className="rounded-full items-center justify-center shadow-lg overflow-hidden"
        style={{ width: sizes[size].container, height: sizes[size].container }}
      >
        <LinearGradient
          colors={['#7B1FA2', '#3F51B5']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="w-full h-full items-center justify-center"
        >
          <Text className={`text-white font-bold ${sizes[size].text}`}>{level}</Text>
          <Text className="text-white text-xs opacity-90">Level</Text>
        </LinearGradient>
      </View>

      {/* Progress bar */}
      <View className={`${sizes[size].width} mt-3 bg-gray-200 rounded-full overflow-hidden ${sizes[size].progress}`}>
        <Animated.View className="h-full rounded-full overflow-hidden" style={animatedWidth}>
          <LinearGradient
            colors={['#7B1FA2', '#3F51B5']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="h-full"
          />
        </Animated.View>
      </View>

      {/* XP text */}
      <Text className="text-xs text-gray-600 mt-1">
        {currentXP} / {nextLevelXP} XP
      </Text>
    </View>
  );
};

