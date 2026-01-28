/**
 * CompletionStep Component
 */

import React from 'react';
import { Box, Text, VStack, HStack, Heading, Center } from '@/components/ui';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';
import type { EnglishLevel } from '@/core/types';
import { getLevelDescription } from '../services/assessment.service';

const AnimatedBox = Animated.createAnimatedComponent(Box);
const AnimatedVStack = Animated.createAnimatedComponent(VStack);

interface CompletionStepProps {
    name: string;
    level: EnglishLevel | null;
}

export function CompletionStep({ name, level }: CompletionStepProps) {
    const levelInfo = level ? getLevelDescription(level) : null;

    return (
        <Center className="flex-1 px-6">
            <VStack space="xl" className="items-center">
                {/* Checkmark Animation */}
                <AnimatedBox
                    entering={ZoomIn.delay(200).duration(500)}
                    className="w-28 h-28 rounded-full overflow-hidden"
                >
                    <LinearGradient
                        colors={['#4CAF50', '#8BC34A']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{
                            width: '100%',
                            height: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Ionicons name="checkmark" size={48} color="#FFFFFF" />
                    </LinearGradient>
                </AnimatedBox>

                {/* Title */}
                <AnimatedVStack
                    entering={FadeIn.delay(400).duration(600)}
                    space="md"
                    className="items-center"
                >
                    <Heading size="3xl" className="text-center">
                        You're all set, {name}!
                    </Heading>
                    <Text className="text-gray-600 dark:text-gray-400 text-center text-lg">
                        Your personalized learning experience is ready.
                    </Text>
                </AnimatedVStack>

                {/* Level Card */}
                {levelInfo && (
                    <AnimatedBox
                        entering={FadeIn.delay(600).duration(600)}
                        className="w-full bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700"
                    >
                        <VStack space="md" className="items-center">
                            <Text className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                                Your English Level
                            </Text>
                            <HStack space="sm" className="items-center">
                                <Box className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900 items-center justify-center">
                                    <Text className="text-primary-700 dark:text-primary-300 font-bold text-xl">
                                        {level}
                                    </Text>
                                </Box>
                                <VStack space="xs">
                                    <Text className="text-xl font-bold text-gray-900 dark:text-white">
                                        {levelInfo.title}
                                    </Text>
                                    <Text className="text-sm text-gray-500 dark:text-gray-400">
                                        {levelInfo.description}
                                    </Text>
                                </VStack>
                            </HStack>
                        </VStack>
                    </AnimatedBox>
                )}

                {/* What's Next */}
                <AnimatedVStack
                    entering={FadeIn.delay(800).duration(600)}
                    space="sm"
                    className="items-center"
                >
                    <Text className="text-sm text-gray-500 dark:text-gray-400">What's next?</Text>
                    <HStack space="md" className="flex-wrap justify-center">
                        <HStack space="xs" className="items-center bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1">
                            <Ionicons name="chatbubble-outline" size={16} color="#6B7280" />
                            <Text className="text-sm text-gray-600 dark:text-gray-300">Start chatting</Text>
                        </HStack>
                        <HStack space="xs" className="items-center bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1">
                            <Ionicons name="mic-outline" size={16} color="#6B7280" />
                            <Text className="text-sm text-gray-600 dark:text-gray-300">Practice speaking</Text>
                        </HStack>
                    </HStack>
                </AnimatedVStack>
            </VStack>
        </Center>
    );
}
