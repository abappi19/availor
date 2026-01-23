import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withSequence,
    withTiming,
} from 'react-native-reanimated';

export const TypingIndicator: React.FC = () => {
    const dot1 = useSharedValue(0);
    const dot2 = useSharedValue(0);
    const dot3 = useSharedValue(0);

    useEffect(() => {
        // Animate dots with staggered timing
        dot1.value = withRepeat(
            withSequence(withTiming(1, { duration: 400 }), withTiming(0, { duration: 400 })),
            -1,
            false
        );

        dot2.value = withDelay(
            150,
            withRepeat(withSequence(withTiming(1, { duration: 400 }), withTiming(0, { duration: 400 })), -1, false)
        );

        dot3.value = withDelay(
            300,
            withRepeat(withSequence(withTiming(1, { duration: 400 }), withTiming(0, { duration: 400 })), -1, false)
        );
    }, [
        // Animate dots with staggered timing
        dot1,
        dot2,
        dot3,
    ]);

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
        <View style={{ flexDirection: 'row', marginBottom: 16 }}>
            <View
                style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: '#E3F2FD',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 12,
                }}
            >
                <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: '#2196F3' }} />
            </View>

            <View
                style={{
                    backgroundColor: '#fff',
                    borderRadius: 16,
                    borderTopLeftRadius: 4,
                    paddingHorizontal: 24,
                    paddingVertical: 16,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 3,
                }}
            >
                <View style={{ flexDirection: 'row', gap: 8 }}>
                    <Animated.View
                        style={[{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#9ca3af' }, dot1Style]}
                    />
                    <Animated.View
                        style={[{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#9ca3af' }, dot2Style]}
                    />
                    <Animated.View
                        style={[{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#9ca3af' }, dot3Style]}
                    />
                </View>
            </View>
        </View>
    );
};
