/**
 * EmptyState Component
 */

import React from 'react';
import { Box, Text, Center, VStack, HStack, Icon } from '@/core/ui';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn } from 'react-native-reanimated';

const AnimatedCenter = Animated.createAnimatedComponent(Center);

const suggestions = ['Grammar', 'Vocabulary', 'Pronunciation', 'Conversation'];

export function EmptyState() {
    return (
        <AnimatedCenter entering={FadeIn.duration(600)} className="flex-1 px-8 py-20">
            {/* Icon */}
            <Box className="w-24 h-24 rounded-full mb-6 overflow-hidden">
                <LinearGradient
                    colors={['#2196F3', '#7B1FA2']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                        width: '100%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Icon name="chatbubbles-outline" size="xl" color="#FFFFFF" />
                </LinearGradient>
            </Box>

            {/* Title */}
            <Text className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-3">
                Start a Conversation
            </Text>

            {/* Message */}
            <Text className="text-base text-gray-600 dark:text-gray-400 text-center leading-6 mb-8">
                Hello! I'm your AI English teacher. I'm here to help you improve your
                English skills. What would you like to practice today?
            </Text>

            {/* Suggestions */}
            <VStack className="w-full max-w-sm" space="md">
                <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 text-center">
                    Try asking about:
                </Text>
                <HStack className="flex-wrap justify-center" space="sm">
                    {suggestions.map((topic) => (
                        <Box
                            key={topic}
                            className="bg-primary-50 dark:bg-primary-900 border border-primary-200 dark:border-primary-700 rounded-full px-4 py-2 mb-2"
                        >
                            <Text className="text-primary-700 dark:text-primary-300 text-sm font-medium">
                                {topic}
                            </Text>
                        </Box>
                    ))}
                </HStack>
            </VStack>
        </AnimatedCenter>
    );
}
