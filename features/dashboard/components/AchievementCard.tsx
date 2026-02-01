/**
 * AchievementCard Component
 */

import { Box, HStack, Text, VStack } from '@/components/ui';
import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import React from 'react';
import type { Achievement } from '../types';

type IconName = ComponentProps<typeof Ionicons>['name'];

interface AchievementCardProps {
    achievement: Achievement;
    isUnlocked: boolean;
}

export function AchievementCard({ achievement, isUnlocked }: AchievementCardProps) {
    return (
        <Box
            className={`rounded-2xl p-4 border ${isUnlocked
                    ? 'bg-white dark:bg-gray-800 border-primary-200 dark:border-primary-700'
                    : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 opacity-60'
                }`}
        >
            <HStack space="md" className="items-center">
                <Box
                    className={`w-14 h-14 rounded-xl items-center justify-center ${isUnlocked ? 'bg-primary-100 dark:bg-primary-900' : 'bg-gray-200 dark:bg-gray-700'
                        }`}
                >
                    <Ionicons
                        name={achievement.icon as IconName}
                        size={32}
                        color={isUnlocked ? '#2196F3' : '#9CA3AF'}
                    />
                </Box>

                <VStack className="flex-1" space="xs">
                    <HStack className="justify-between items-center">
                        <Text
                            className={`font-semibold ${isUnlocked ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
                                }`}
                        >
                            {achievement.title}
                        </Text>
                        {isUnlocked && <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />}
                    </HStack>
                    <Text className="text-sm text-gray-500 dark:text-gray-400">{achievement.description}</Text>
                    <Text className="text-xs text-primary-500 font-medium">+{achievement.xpReward} XP</Text>
                </VStack>
            </HStack>
        </Box>
    );
}
