/**
 * WelcomeStep Component
 */

import { Box, Heading, Input, Text, VStack } from '@/components/ui';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import Animated, { FadeInDown } from 'react-native-reanimated';

const AnimatedVStack = Animated.createAnimatedComponent(VStack);

interface WelcomeStepProps {
    name: string;
    onNameChange: (name: string) => void;
}

export function WelcomeStep({ name, onNameChange }: WelcomeStepProps) {
    return (
        <VStack className="flex-1 px-6" space="xl">
            {/* Logo */}
            <AnimatedVStack entering={FadeInDown.delay(100).duration(600)} className="items-center pt-8" space="md">
                <Box className="w-24 h-24 rounded-3xl overflow-hidden">
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
                        <Text className="text-white text-4xl font-bold">Av</Text>
                    </LinearGradient>
                </Box>
                <Heading size="3xl" className="text-center">
                    Welcome to Availor
                </Heading>
                <Text className="text-gray-600 dark:text-gray-400 text-center text-lg">
                    Your personal AI English teacher
                </Text>
            </AnimatedVStack>

            {/* Name Input */}
            <AnimatedVStack entering={FadeInDown.delay(300).duration(600)} className="flex-1 justify-center" space="lg">
                <VStack space="md">
                    <Text className="text-lg font-semibold text-gray-900 dark:text-white">What's your name?</Text>
                    <Input
                        value={name}
                        onChangeText={onNameChange}
                        placeholder="Enter your name"
                        autoFocus
                        autoCapitalize="words"
                        returnKeyType="next"
                    />
                    <Text className="text-sm text-gray-500 dark:text-gray-400">
                        We'll personalize your learning experience based on this.
                    </Text>
                </VStack>
            </AnimatedVStack>
        </VStack>
    );
}
