/**
 * StreakCounter Component
 */

import { Box, HStack, Text } from '@/components/ui';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';

interface StreakCounterProps {
    days: number;
}

export function StreakCounter({ days }: StreakCounterProps) {
    const isActive = days > 0;

    return (
        <Box className="overflow-hidden rounded-2xl">
            <LinearGradient
                colors={isActive ? ['#FF9800', '#F44336'] : ['#9E9E9E', '#757575']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ padding: 20 }}
            >
                <HStack className="justify-between items-center">
                    <HStack space="md" className="items-center">
                        <Ionicons name="flame" size={48} color="#FFFFFF" />
                        <Box>
                            <Text className="text-white text-sm font-medium opacity-90">Current Streak</Text>
                            <Text className="text-white text-3xl font-bold">
                                {days} {days === 1 ? 'day' : 'days'}
                            </Text>
                        </Box>
                    </HStack>

                    {isActive && days >= 7 && (
                        <Box className="bg-white/20 rounded-full px-3 py-1">
                            <Text className="text-white text-sm font-semibold">🔥 On Fire!</Text>
                        </Box>
                    )}
                </HStack>

                {isActive && (
                    <Text className="text-white/80 text-sm mt-3">
                        Keep going! Practice daily to maintain your streak.
                    </Text>
                )}
            </LinearGradient>
        </Box>
    );
}
