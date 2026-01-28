/**
 * AchievementList Component
 */

import React from 'react';
import { Box, Text, VStack, HStack } from '@/core/ui';
import { AchievementCard } from './AchievementCard';
import type { Achievement } from '../types';

interface AchievementListProps {
    unlocked: Achievement[];
    locked: Achievement[];
}

export function AchievementList({ unlocked, locked }: AchievementListProps) {
    return (
        <VStack space="lg">
            {/* Unlocked */}
            {unlocked.length > 0 && (
                <VStack space="md">
                    <HStack className="justify-between items-center">
                        <Text className="text-lg font-semibold text-gray-900 dark:text-white">
                            Unlocked
                        </Text>
                        <Text className="text-sm text-gray-500 dark:text-gray-400">
                            {unlocked.length} earned
                        </Text>
                    </HStack>
                    
                    <VStack space="sm">
                        {unlocked.map((achievement) => (
                            <AchievementCard
                                key={achievement.id}
                                achievement={achievement}
                                isUnlocked
                            />
                        ))}
                    </VStack>
                </VStack>
            )}

            {/* Locked */}
            {locked.length > 0 && (
                <VStack space="md">
                    <HStack className="justify-between items-center">
                        <Text className="text-lg font-semibold text-gray-900 dark:text-white">
                            In Progress
                        </Text>
                        <Text className="text-sm text-gray-500 dark:text-gray-400">
                            {locked.length} remaining
                        </Text>
                    </HStack>
                    
                    <VStack space="sm">
                        {locked.slice(0, 5).map((achievement) => (
                            <AchievementCard
                                key={achievement.id}
                                achievement={achievement}
                                isUnlocked={false}
                            />
                        ))}
                    </VStack>
                </VStack>
            )}
        </VStack>
    );
}
