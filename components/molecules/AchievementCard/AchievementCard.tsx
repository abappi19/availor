import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const AnimatedView = Animated.createAnimatedComponent(View);

export interface AchievementCardProps {
    id: string;
    title: string;
    description: string;
    icon: keyof typeof Ionicons.glyphMap;
    isUnlocked: boolean;
    progress?: number; // 0-100
    onPress?: () => void;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({
    title,
    description,
    icon,
    isUnlocked,
    progress = 0,
    onPress,
}) => {
    return (
        <AnimatedView entering={FadeIn.duration(500)} exiting={FadeOut}>
            <TouchableOpacity
                onPress={onPress}
                disabled={!onPress}
                activeOpacity={0.8}
                className="rounded-xl shadow-md overflow-hidden"
            >
                {isUnlocked ? (
                    <LinearGradient
                        colors={['#FFD700', '#FF9800']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        className="p-4"
                    >
                        <View className="flex-row items-center">
                            {/* Icon */}
                            <View className="w-16 h-16 rounded-full items-center justify-center bg-white">
                                <Ionicons name={icon} size={32} color="#FFD700" />
                            </View>

                            {/* Content */}
                            <View className="flex-1 ml-4">
                                <Text className="font-bold text-lg text-white">{title}</Text>
                                <Text className="text-sm mt-1 text-white opacity-90">{description}</Text>
                            </View>

                            {/* Unlocked indicator */}
                            <Ionicons name="checkmark-circle" size={24} color="white" />
                        </View>
                    </LinearGradient>
                ) : (
                    <View className="p-4 bg-gray-200">
                        <View className="flex-row items-center">
                            {/* Icon */}
                            <View className="w-16 h-16 rounded-full items-center justify-center bg-gray-300">
                                <Ionicons name={icon} size={32} color="#999" />
                            </View>

                            {/* Content */}
                            <View className="flex-1 ml-4">
                                <Text className="font-bold text-lg text-gray-600">{title}</Text>
                                <Text className="text-sm mt-1 text-gray-500">{description}</Text>

                                {/* Progress bar for locked achievements */}
                                {progress > 0 && (
                                    <View className="mt-2 h-2 bg-gray-300 rounded-full overflow-hidden">
                                        <View className="h-full bg-primary-500" style={{ width: `${progress}%` }} />
                                    </View>
                                )}
                            </View>

                            {/* Locked indicator */}
                            <Ionicons name="lock-closed" size={24} color="#999" />
                        </View>
                    </View>
                )}
            </TouchableOpacity>
        </AnimatedView>
    );
};
