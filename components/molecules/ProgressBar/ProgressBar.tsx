import React, { useEffect } from 'react';
import { Text, View, type ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export interface ProgressBarProps {
    value: number; // 0-100
    label?: string;
    showPercentage?: boolean;
    color?: string;
    height?: number;
    style?: ViewStyle;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
    value,
    label,
    showPercentage = false,
    color = '#2196F3',
    height = 12,
    style,
}) => {
    const progress = useSharedValue(0);

    useEffect(() => {
        progress.value = withSpring(Math.min(Math.max(value, 0), 100));
    }, [value, progress]);

    const animatedStyle = useAnimatedStyle(() => ({
        width: `${progress.value}%`,
    }));

    return (
        <View style={style}>
            {(label || showPercentage) && (
                <View className="flex-row justify-between mb-2">
                    {label && <Text className="text-sm font-medium text-gray-700">{label}</Text>}
                    {showPercentage && <Text className="text-sm font-medium text-gray-700">{Math.round(value)}%</Text>}
                </View>
            )}

            <View className="bg-gray-200 rounded-full overflow-hidden" style={{ height }}>
                <Animated.View className="h-full rounded-full" style={[animatedStyle, { backgroundColor: color }]} />
            </View>
        </View>
    );
};
