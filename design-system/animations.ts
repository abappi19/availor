/**
 * Reusable Animations
 * Common animation configurations for React Native Reanimated
 */

import {
  withSpring,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
} from 'react-native-reanimated';

export const animations = {
  // Spring configurations
  spring: {
    default: {
      damping: 15,
      stiffness: 150,
      mass: 1,
    },
    gentle: {
      damping: 20,
      stiffness: 120,
      mass: 1,
    },
    bouncy: {
      damping: 10,
      stiffness: 200,
      mass: 1,
    },
  },

  // Timing configurations
  timing: {
    fast: {
      duration: 150,
      easing: Easing.out(Easing.ease),
    },
    normal: {
      duration: 300,
      easing: Easing.out(Easing.ease),
    },
    slow: {
      duration: 500,
      easing: Easing.out(Easing.ease),
    },
  },

  // Common animation patterns
  fadeIn: (duration = 300) =>
    withTiming(1, { duration, easing: Easing.out(Easing.ease) }),

  fadeOut: (duration = 300) =>
    withTiming(0, { duration, easing: Easing.in(Easing.ease) }),

  scale: (toValue: number, config = animations.spring.default) =>
    withSpring(toValue, config),

  pulse: (config = animations.spring.default) =>
    withRepeat(
      withSequence(
        withSpring(1.1, config),
        withSpring(1, config)
      ),
      -1,
      true
    ),

  shake: () =>
    withRepeat(
      withSequence(
        withTiming(-10, { duration: 50 }),
        withTiming(10, { duration: 50 }),
        withTiming(-10, { duration: 50 }),
        withTiming(10, { duration: 50 }),
        withTiming(0, { duration: 50 })
      ),
      1,
      false
    ),
};

export type AnimationType = typeof animations;

