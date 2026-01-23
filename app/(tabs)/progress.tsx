/**
 * Progress Screen
 * Displays user progress, achievements, and statistics
 */

import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { Heading } from '@/components/atoms/Text';
import { AchievementCard } from '@/components/molecules/AchievementCard';
import { LevelBadge } from '@/components/molecules/LevelBadge';
import { StatCard } from '@/components/molecules/StatCard';
import { StreakCounter } from '@/components/molecules/StreakCounter';

export default function ProgressScreen() {
    // TODO: Integrate with actual progress and gamification services
    const mockData = {
        streak: 7,
        level: 5,
        xp: 1250,
        conversationsToday: 3,
        wordsLearned: 45,
        timeSpent: 35,
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <ScrollView className="flex-1">
                {/* Header */}
                <View className="bg-white p-6 border-b border-gray-200">
                    <Heading level="h1" className="mb-2">
                        Your Progress
                    </Heading>
                    <Text className="text-gray-600">Keep up the great work!</Text>
                </View>

                {/* Streak and Level */}
                <View className="flex-row p-6 gap-4">
                    <View className="flex-1">
                        <StreakCounter count={mockData.streak} />
                    </View>
                    <View className="flex-1">
                        <LevelBadge level={mockData.level} xp={mockData.xp} nextLevelXp={1500} />
                    </View>
                </View>

                {/* Today's Stats */}
                <View className="px-6 mb-4">
                    <Text className="text-lg font-semibold text-gray-900 mb-3">Today's Activity</Text>
                    <View className="flex-row flex-wrap gap-3">
                        <View className="flex-1 min-w-[45%]">
                            <StatCard
                                value={mockData.conversationsToday.toString()}
                                label="Conversations"
                                icon="chatbubbles"
                            />
                        </View>
                        <View className="flex-1 min-w-[45%]">
                            <StatCard value={mockData.wordsLearned.toString()} label="Words Learned" icon="book" />
                        </View>
                        <View className="flex-1 min-w-[45%]">
                            <StatCard value={`${mockData.timeSpent}m`} label="Time Spent" icon="time" />
                        </View>
                    </View>
                </View>

                {/* Recent Achievements */}
                <View className="px-6 mb-6">
                    <Text className="text-lg font-semibold text-gray-900 mb-3">Recent Achievements</Text>
                    <AchievementCard
                        title="Week Warrior"
                        description="Maintained a 7-day streak"
                        icon="flame"
                        unlocked={true}
                    />
                    <AchievementCard
                        title="Conversation Master"
                        description="Complete 50 conversations"
                        icon="chatbubbles"
                        unlocked={false}
                        progress={30}
                    />
                </View>

                {/* Coming Soon Notice */}
                <View className="mx-6 mb-6 p-4 bg-primary-50 rounded-xl border border-primary-200">
                    <Text className="text-primary-700 font-medium mb-1">📊 More detailed analytics coming soon!</Text>
                    <Text className="text-primary-600 text-sm">
                        Progress tracking, charts, and detailed insights are in development.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
