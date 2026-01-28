/**
 * VoiceButton Component
 */

import React from 'react';
import { Box, Pressable, Icon } from '@/core/ui';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
    cancelAnimation,
} from 'react-native-reanimated';
import { useEffect } from 'react';

const AnimatedBox = Animated.createAnimatedComponent(Box);

interface VoiceButtonProps {
    isRecording: boolean;
    onPress: () => void;
    disabled?: boolean;
}

export function VoiceButton({ isRecording, onPress, disabled }: VoiceButtonProps) {
    const scale = useSharedValue(1);

    useEffect(() => {
        if (isRecording) {
            scale.value = withRepeat(
                withTiming(1.2, { duration: 500 }),
                -1,
                true
            );
        } else {
            cancelAnimation(scale);
            scale.value = withTiming(1, { duration: 200 });
        }
    }, [isRecording, scale]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    return (
        <Pressable onPress={onPress} disabled={disabled}>
            <AnimatedBox
                style={animatedStyle}
                className={`w-14 h-14 rounded-full items-center justify-center ${
                    isRecording ? 'bg-error-500' : 'bg-primary-500'
                } ${disabled ? 'opacity-50' : ''}`}
            >
                <Icon
                    name={isRecording ? 'stop' : 'mic'}
                    size="lg"
                    color="#FFFFFF"
                />
            </AnimatedBox>
        </Pressable>
    );
}
