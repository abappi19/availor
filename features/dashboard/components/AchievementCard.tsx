/**
 * AchievementCard Component
 */

import React from 'react';
import { Box, Text, HStack, VStack, Icon, type IconName } from '@/core/ui';
import type { Achievement } from '../types';

interface AchievementCardProps {
    achievement: Achievement;
    isUnlocked: boolean;
}

export function AchievementCard({ achievement, isUnlocked }: AchievementCardProps) {
    return (
        <Box
            className={`rounded-2xl p-4 border ${
                isUnlocked
                    ? 'bg-white dark:bg-gray-800 border-primary-200 dark:border-primary-700'
                    : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 opacity-60'
            }`}
        >
            <HStack space="md" className="items-center">
                <Box
                    className={`w-14 h-14 rounded-xl items-center justify-center ${
                        isUnlocked ? 'bg-primary-100 dark:bg-primary-900' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                >
                    <Icon
                        name={achievement.icon as IconName}
                        size="lg"
                        color={isUnlocked ? '#2196F3' : '#9CA3AF'}
                    />
                </Box>

                <VStack className="flex-1" space="xs">
                    <HStack className="justify-between items-center">
                        <Text
                            className={`font-semibold ${
                                isUnlocked ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
                            }`}
                        >
                            {achievement.title}
                        </Text>
                        {isUnlocked && (
                            <Icon name="checkmark-circle" size="md" color="#4CAF50" />
                        )}
                    </HStack>
                    <Text className="text-sm text-gray-500 dark:text-gray-400">{achievement.description}</Text>
                    <Text className="text-xs text-primary-500 font-medium">
                        +{achievement.xpReward} XP
                    </Text>
                </VStack>
            </HStack>
        </Box>
    );
}
