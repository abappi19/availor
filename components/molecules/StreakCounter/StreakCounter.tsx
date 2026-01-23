import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withSpring,
} from 'react-native-reanimated';

export interface StreakCounterProps {
    streakDays: number;
    isActive: boolean;
}

export const StreakCounter: React.FC<StreakCounterProps> = ({ streakDays, isActive }) => {
    const scale = useSharedValue(1);

    // Flame animation when active
    useEffect(() => {
        if (isActive) {
            scale.value = withRepeat(withSequence(withSpring(1.2), withSpring(1)), -1, true);
        } else {
            scale.value = withSpring(1);
        }
    }, [isActive, scale]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    return (
        <LinearGradient
            colors={['#FF9800', '#F44336']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="flex-row items-center px-4 py-3 rounded-2xl shadow-lg"
        >
            <Animated.View style={animatedStyle}>
                <Ionicons name="flame" size={32} color={isActive ? '#FFD700' : '#FFA500'} />
            </Animated.View>

            <View className="ml-3">
                <Text className="text-white text-2xl font-bold">{streakDays}</Text>
                <Text className="text-white text-xs opacity-90">day streak</Text>
            </View>
        </LinearGradient>
    );
};
