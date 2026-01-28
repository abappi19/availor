/**
 * DashboardScreen Component
 */

import { Box, Center, HStack, ScrollView, Spinner, Text, VStack } from '@/components/ui';
import { useUserStore } from '@/core/stores';
import { formatDuration } from '@/core/utils/string';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDashboard } from '../hooks/use-dashboard';
import { AchievementList } from './AchievementList';
import { LevelBadge } from './LevelBadge';
import { StatsCard } from './StatsCard';
import { StreakCounter } from './StreakCounter';

export function DashboardScreen() {
    const user = useUserStore((state) => state.user);
    const {
        gamification,
        todayProgress,
        totalStats,
        levelInfo,
        levelProgress,
        unlockedAchievements,
        lockedAchievements,
        isLoading,
    } = useDashboard();

    if (isLoading || !gamification || !levelInfo || !levelProgress) {
        return (
            <Center className="flex-1 bg-gray-50 dark:bg-gray-900">
                <Spinner size="large" color="#2196F3" />
            </Center>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900" edges={['top', 'left', 'right']}>
            <ScrollView
                className="flex-1"
                contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <VStack space="sm" className="mb-6">
                    <Text className="text-2xl font-bold text-gray-900 dark:text-white">
                        Hello, {user?.name || 'Learner'}!
                    </Text>
                    <Text className="text-gray-500 dark:text-gray-400">
                        Keep up the great work! Here's your progress.
                    </Text>
                </VStack>

                {/* Streak */}
                <Box className="mb-6">
                    <StreakCounter days={gamification.streakDays} />
                </Box>

                {/* Level */}
                <Box className="mb-6">
                    <LevelBadge levelInfo={levelInfo} progress={levelProgress} totalXP={gamification.totalXP} />
                </Box>

                {/* Today's Stats */}
                <VStack space="md" className="mb-6">
                    <Text className="text-lg font-semibold text-gray-900 dark:text-white">Today</Text>
                    <HStack space="md">
                        <StatsCard
                            title="Messages"
                            value={todayProgress?.messagesCount || 0}
                            icon="chatbubbles-outline"
                            iconColor="#2196F3"
                            backgroundColor="#EBF5FF"
                        />
                        <StatsCard
                            title="XP Earned"
                            value={todayProgress?.xpEarned || 0}
                            icon="star-outline"
                            iconColor="#FF9800"
                            backgroundColor="#FFF3E0"
                        />
                    </HStack>
                </VStack>

                {/* Total Stats */}
                <VStack space="md" className="mb-6">
                    <Text className="text-lg font-semibold text-gray-900 dark:text-white">All Time</Text>
                    <HStack space="md">
                        <StatsCard
                            title="Total Messages"
                            value={totalStats?.totalMessages || 0}
                            icon="chatbubbles"
                            iconColor="#4CAF50"
                            backgroundColor="#E8F5E9"
                        />
                        <StatsCard
                            title="Practice Time"
                            value={formatDuration(totalStats?.totalMinutes || 0)}
                            icon="time"
                            iconColor="#9C27B0"
                            backgroundColor="#F3E5F5"
                        />
                    </HStack>
                </VStack>

                {/* Achievements */}
                <VStack space="md">
                    <Text className="text-lg font-semibold text-gray-900 dark:text-white">Achievements</Text>
                    <AchievementList unlocked={unlockedAchievements} locked={lockedAchievements} />
                </VStack>
            </ScrollView>
        </SafeAreaView>
    );
}
