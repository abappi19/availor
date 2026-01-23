/**
 * EmptyState Component
 * Displays a friendly empty state with icon and message
 */

import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

export interface EmptyStateProps {
    icon?: keyof typeof Ionicons.glyphMap;
    title?: string;
    message?: string;
    gradient?: boolean;
}

const AnimatedView = Animated.createAnimatedComponent(View);

export const EmptyState: React.FC<EmptyStateProps> = ({
    icon = 'chatbubbles-outline',
    title = 'Start a Conversation',
    message = "Hello! I'm your AI English teacher. I'm here to help you improve your English skills. What would you like to practice today?",
    gradient = true,
}) => {
    return (
        <AnimatedView entering={FadeIn.duration(600)} className="flex-1 items-center justify-center px-8 py-20">
            {/* Icon Container */}
            <View className="w-24 h-24 rounded-full items-center justify-center mb-6 overflow-hidden">
                {gradient ? (
                    <LinearGradient
                        colors={['#2196F3', '#7B1FA2']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        className="w-full h-full items-center justify-center"
                    >
                        <Ionicons name={icon} size={48} color="white" />
                    </LinearGradient>
                ) : (
                    <View className="w-full h-full bg-primary-100 items-center justify-center">
                        <Ionicons name={icon} size={48} color="#2196F3" />
                    </View>
                )}
            </View>

            {/* Title */}
            <Text className="text-2xl font-bold text-gray-900 text-center mb-3">{title}</Text>

            {/* Message */}
            <Text className="text-base text-gray-600 text-center leading-relaxed">{message}</Text>

            {/* Suggestions */}
            <View className="mt-8 w-full max-w-sm">
                <Text className="text-sm font-semibold text-gray-700 mb-3 text-center">Try asking about:</Text>
                <View className="flex-row flex-wrap justify-center gap-2">
                    {['Grammar', 'Vocabulary', 'Pronunciation', 'Conversation'].map((topic) => (
                        <View key={topic} className="bg-primary-50 border border-primary-200 rounded-full px-4 py-2">
                            <Text className="text-primary-700 text-sm font-medium">{topic}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </AnimatedView>
    );
};
