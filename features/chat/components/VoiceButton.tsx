/**
 * VoiceButton Component
 */

import { Box, Pressable } from '@/components/ui';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import Animated, {
    cancelAnimation,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from 'react-native-reanimated';

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
            scale.value = withRepeat(withTiming(1.2, { duration: 500 }), -1, true);
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
                <Ionicons name={isRecording ? 'stop' : 'mic'} size={32} color="#FFFFFF" />
            </AnimatedBox>
        </Pressable>
    );
}
