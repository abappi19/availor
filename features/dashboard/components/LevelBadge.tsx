/**
 * LevelBadge Component
 */

import { Box, HStack, Progress, ProgressFilledTrack, Text, VStack } from '@/components/ui';
import React from 'react';
import type { LevelInfo } from '../types';

interface LevelBadgeProps {
    levelInfo: LevelInfo;
    progress: { current: number; max: number; percentage: number };
    totalXP: number;
}

export function LevelBadge({ levelInfo, progress, totalXP }: LevelBadgeProps) {
    return (
        <Box className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700">
            <HStack className="justify-between items-start mb-4">
                <VStack space="xs">
                    <Text className="text-sm text-gray-500 dark:text-gray-400 font-medium">Current Level</Text>
                    <HStack space="sm" className="items-center">
                        <Box
                            className="w-10 h-10 rounded-full items-center justify-center"
                            style={{ backgroundColor: levelInfo.color }}
                        >
                            <Text className="text-white font-bold text-lg">{levelInfo.level}</Text>
                        </Box>
                        <Text className="text-xl font-bold text-gray-900 dark:text-white">{levelInfo.name}</Text>
                    </HStack>
                </VStack>

                <VStack className="items-end" space="xs">
                    <Text className="text-xs text-gray-500 dark:text-gray-400">Total XP</Text>
                    <Text className="text-lg font-semibold text-gray-900 dark:text-white">
                        {totalXP.toLocaleString()}
                    </Text>
                </VStack>
            </HStack>

            {/* Progress Bar */}
            <VStack space="sm">
                <HStack className="justify-between">
                    <Text className="text-sm text-gray-600 dark:text-gray-400">
                        {progress.current} / {progress.max} XP
                    </Text>
                    <Text className="text-sm font-medium" style={{ color: levelInfo.color }}>
                        {progress.percentage}%
                    </Text>
                </HStack>
                <Progress value={progress.percentage} size="md">
                    <ProgressFilledTrack style={{ width: `${progress.percentage}%` }} />
                </Progress>
                <Text className="text-xs text-gray-500 dark:text-gray-400 text-center">
                    {progress.max - progress.current} XP to level {levelInfo.level + 1}
                </Text>
            </VStack>
        </Box>
    );
}
