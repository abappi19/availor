/**
 * TypingIndicator Component
 */

import React, { useEffect } from 'react';
import { Box, HStack } from '@/core/ui';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
    withDelay,
} from 'react-native-reanimated';

const AnimatedBox = Animated.createAnimatedComponent(Box);

function Dot({ delay }: { delay: number }) {
    const scale = useSharedValue(1);
    const opacity = useSharedValue(0.4);

    useEffect(() => {
        scale.value = withDelay(
            delay,
            withRepeat(
                withSequence(
                    withTiming(1.2, { duration: 300 }),
                    withTiming(1, { duration: 300 })
                ),
                -1,
                true
            )
        );
        opacity.value = withDelay(
            delay,
            withRepeat(
                withSequence(
                    withTiming(1, { duration: 300 }),
                    withTiming(0.4, { duration: 300 })
                ),
                -1,
                true
            )
        );
    }, [delay, scale, opacity]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        opacity: opacity.value,
    }));

    return (
        <AnimatedBox
            style={animatedStyle}
            className="w-2 h-2 rounded-full bg-gray-500 dark:bg-gray-400"
        />
    );
}

export function TypingIndicator() {
    return (
        <Box className="bg-white dark:bg-gray-800 rounded-2xl rounded-tl-sm px-4 py-3 border border-gray-100 dark:border-gray-700 self-start">
            <HStack space="xs">
                <Dot delay={0} />
                <Dot delay={150} />
                <Dot delay={300} />
            </HStack>
        </Box>
    );
}
